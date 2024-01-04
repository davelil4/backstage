/*
 * Copyright 2022 The Backstage Authors
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import { TokenManager, getVoidLogger } from '@backstage/backend-common';
import {
  PluginTaskScheduler,
  TaskInvocationDefinition,
  TaskRunner,
} from '@backstage/backend-tasks';
import { setupRequestMockHandlers } from '@backstage/backend-test-utils';
import { ConfigReader } from '@backstage/config';
import {
  DeferredEntity,
  EntityProviderConnection,
  locationSpecToLocationEntity,
} from '@backstage/plugin-catalog-node';
import { rest } from 'msw';
import { setupServer } from 'msw/node';
import {
  BitbucketServerEntityProvider,
  toDeferredEntities,
} from './BitbucketServerEntityProvider';
import { BitbucketServerPagedResponse } from '../lib';
import { Entity, LocationEntity } from '@backstage/catalog-model';
import { Events } from '../lib/types';
import { CatalogApi } from '@backstage/catalog-client';

class PersistingTaskRunner implements TaskRunner {
  private tasks: TaskInvocationDefinition[] = [];

  getTasks() {
    return this.tasks;
  }

  run(task: TaskInvocationDefinition): Promise<void> {
    this.tasks.push(task);
    return Promise.resolve(undefined);
  }
}

type Project = {
  key: string;
  repos: [string];
};

function pagedResponse(values: any): BitbucketServerPagedResponse<any> {
  return {
    values: values,
    isLastPage: true,
  } as BitbucketServerPagedResponse<any>;
}

const logger = getVoidLogger();

const server = setupServer();

function setupStubs(projects: Project[], baseUrl: string) {
  // Stub projects
  server.use(
    rest.get(`${baseUrl}/rest/api/1.0/projects`, (_, res, ctx) => {
      return res(
        ctx.json(
          pagedResponse(
            projects.map(p => {
              return { key: p.key };
            }),
          ),
        ),
      );
    }),
  );

  for (const project of projects) {
    // Stub list repositories
    server.use(
      rest.get(
        `${baseUrl}/rest/api/1.0/projects/${project.key}/repos`,
        (_, res, ctx) => {
          const response = [];
          for (const repo of project.repos) {
            response.push({
              slug: repo,
              links: {
                self: [
                  {
                    href: `${baseUrl}/projects/${project.key}/repos/${repo}/browse`,
                  },
                ],
              },
            });
          }
          return res(ctx.json(pagedResponse(response)));
        },
      ),
    );
  }
}

const host = 'bitbucket.mycompany.com';
const targetPath = `/catalog-info.yaml`;
const test1RepoUrl = `https://${host}/projects/TEST/repos/test1/browse`;

function setupRepositoryReqHandler() {
  server.use(
    rest.get(
      `https://${host}/rest/api/1.0/projects/TEST/repos/test1`,
      (_, res, ctx) => {
        const response = {
          slug: 'test1',
          id: 1,
          name: 'test1',
          project: {
            key: 'TEST',
            id: 1,
            name: 'TEST',
            links: {
              self: [
                {
                  href: `https://${host}/projects/TEST`,
                },
              ],
            },
          },
          links: {
            self: [
              {
                href: `${test1RepoUrl}`,
              },
            ],
          },
        };
        return res(ctx.json(response));
      },
    ),
  );
}

const tokenManager = {
  getToken: async () => {
    return { token: 'fake-token' };
  },
} as any as TokenManager;
const repoPushEvent: Events.PushEvent = {
  eventKey: 'repo:refs_changed',
  date: '2017-09-19T09:45:32+1000',
  actor: {
    name: 'admin',
    id: 1,
  },
  repository: {
    slug: 'test1',
    id: 84,
    name: 'test1',
    project: {
      key: 'TEST',
    },
  },
  changes: [
    {
      ref: {
        id: 'refs/heads/master',
        displayId: 'master',
        type: 'BRANCH',
      },
    },
  ],
  commits: undefined,
  ToCommit: undefined,
};
const repoPushEventParams = {
  topic: 'bitbucketServer.repo:refs_changed',
  eventPayload: repoPushEvent,
  metadata: { 'x-event-key': 'repo:refs_changed' },
};

const createLocationEntity = (
  repoUrl: string,
  path: string,
): LocationEntity => {
  const target = `${repoUrl}${path}`;

  const entity = locationSpecToLocationEntity({
    location: {
      type: 'url',
      target: target,
      presence: 'optional',
    },
  });
  entity.metadata.annotations = {
    ...entity.metadata.annotations,
    [`${host}/repo-url`]: target,
  };

  return entity;
};

describe('BitbucketServerEntityProvider', () => {
  setupRequestMockHandlers(server);
  afterEach(() => jest.resetAllMocks());

  it('no provider config', () => {
    const schedule = new PersistingTaskRunner();
    const config = new ConfigReader({});
    const providers = BitbucketServerEntityProvider.fromConfig(config, {
      logger,
      schedule,
    });

    expect(providers).toHaveLength(0);
  });

  it('rejects no matching integration', () => {
    const schedule = new PersistingTaskRunner();
    const config = new ConfigReader({
      catalog: {
        providers: {
          bitbucketServer: {
            mainProvider: {
              host: 'bitbucket.mycompany.com',
            },
          },
        },
      },
    });
    expect(() =>
      BitbucketServerEntityProvider.fromConfig(config, { logger, schedule }),
    ).toThrow(/bitbucket\.mycompany\.com/);
  });

  it('single simple provider config', () => {
    const schedule = new PersistingTaskRunner();
    const config = new ConfigReader({
      catalog: {
        providers: {
          bitbucketServer: {
            host: 'bitbucket.mycompany.com',
          },
        },
      },
      integrations: {
        bitbucketServer: [
          {
            host: 'bitbucket.mycompany.com',
          },
        ],
      },
    });
    const providers = BitbucketServerEntityProvider.fromConfig(config, {
      logger,
      schedule,
    });

    expect(providers).toHaveLength(1);
    expect(providers[0].getProviderName()).toEqual(
      'bitbucketServer-provider:default',
    );
  });

  it('multiple provider configs', () => {
    const schedule = new PersistingTaskRunner();
    const config = new ConfigReader({
      integrations: {
        bitbucketServer: [
          {
            host: 'bitbucket.mycompany.com',
          },
        ],
      },
      catalog: {
        providers: {
          bitbucketServer: {
            mainProvider: {
              host: 'bitbucket.mycompany.com',
            },
            secondary: {
              host: 'bitbucket.mycompany.com',
            },
          },
        },
      },
    });
    const providers = BitbucketServerEntityProvider.fromConfig(config, {
      logger,
      schedule,
    });

    expect(providers).toHaveLength(2);
    expect(providers[0].getProviderName()).toEqual(
      'bitbucketServer-provider:mainProvider',
    );
    expect(providers[1].getProviderName()).toEqual(
      'bitbucketServer-provider:secondary',
    );
  });

  it('apply full update on scheduled execution with filters', async () => {
    const config = new ConfigReader({
      integrations: {
        bitbucketServer: [
          {
            host: host,
          },
        ],
      },
      catalog: {
        providers: {
          bitbucketServer: {
            mainProvider: {
              host: host,
              filters: {
                projectKey: 'project-.*',
                repoSlug: 'repo-.*',
              },
            },
          },
        },
      },
    });
    const schedule = new PersistingTaskRunner();
    const entityProviderConnection: EntityProviderConnection = {
      applyMutation: jest.fn(),
      refresh: jest.fn(),
    };
    const provider = BitbucketServerEntityProvider.fromConfig(config, {
      logger,
      schedule,
    })[0];
    expect(provider.getProviderName()).toEqual(
      'bitbucketServer-provider:mainProvider',
    );

    setupStubs(
      [
        { key: 'project-test', repos: ['repo-test'] },
        { key: 'other-project', repos: ['other-repo'] },
      ],
      `https://${host}`,
    );
    await provider.connect(entityProviderConnection);

    const taskDef = schedule.getTasks()[0];
    expect(taskDef.id).toEqual('bitbucketServer-provider:mainProvider:refresh');
    await (taskDef.fn as () => Promise<void>)();

    const url = `https://${host}/projects/project-test/repos/repo-test/browse/catalog-info.yaml`;
    const expectedEntities = [
      {
        entity: {
          apiVersion: 'backstage.io/v1alpha1',
          kind: 'Location',
          metadata: {
            annotations: {
              'backstage.io/managed-by-location': `url:${url}`,
              'backstage.io/managed-by-origin-location': `url:${url}`,
            },
            name: 'generated-77f4323822420990f8c3e3c981d38c2dec4ae3a6',
          },
          spec: {
            presence: 'optional',
            target: `${url}`,
            type: 'url',
          },
        },
        locationKey: 'bitbucketServer-provider:mainProvider',
      },
    ];

    expect(entityProviderConnection.applyMutation).toHaveBeenCalledTimes(1);
    expect(entityProviderConnection.applyMutation).toHaveBeenCalledWith({
      type: 'full',
      entities: expectedEntities,
    });
  });

  it('apply full update on scheduled execution without filters', async () => {
    const config = new ConfigReader({
      integrations: {
        bitbucketServer: [
          {
            host: host,
          },
        ],
      },
      catalog: {
        providers: {
          bitbucketServer: {
            mainProvider: {
              host: host,
            },
          },
        },
      },
    });
    const schedule = new PersistingTaskRunner();
    const entityProviderConnection: EntityProviderConnection = {
      applyMutation: jest.fn(),
      refresh: jest.fn(),
    };
    const provider = BitbucketServerEntityProvider.fromConfig(config, {
      logger,
      schedule,
    })[0];
    expect(provider.getProviderName()).toEqual(
      'bitbucketServer-provider:mainProvider',
    );

    setupStubs(
      [
        { key: 'project-test', repos: ['repo-test'] },
        { key: 'other-project', repos: ['other-repo'] },
      ],
      `https://${host}`,
    );
    await provider.connect(entityProviderConnection);

    const taskDef = schedule.getTasks()[0];
    expect(taskDef.id).toEqual('bitbucketServer-provider:mainProvider:refresh');
    await (taskDef.fn as () => Promise<void>)();

    const expectedEntities = [
      {
        entity: {
          apiVersion: 'backstage.io/v1alpha1',
          kind: 'Location',
          metadata: {
            annotations: {
              'backstage.io/managed-by-location': `url:https://${host}/projects/project-test/repos/repo-test/browse/catalog-info.yaml`,
              'backstage.io/managed-by-origin-location': `url:https://${host}/projects/project-test/repos/repo-test/browse/catalog-info.yaml`,
            },
            name: 'generated-77f4323822420990f8c3e3c981d38c2dec4ae3a6',
          },
          spec: {
            presence: 'optional',
            target: `https://${host}/projects/project-test/repos/repo-test/browse/catalog-info.yaml`,
            type: 'url',
          },
        },
        locationKey: 'bitbucketServer-provider:mainProvider',
      },
      {
        entity: {
          apiVersion: 'backstage.io/v1alpha1',
          kind: 'Location',
          metadata: {
            annotations: {
              'backstage.io/managed-by-location': `url:https://${host}/projects/other-project/repos/other-repo/browse/catalog-info.yaml`,
              'backstage.io/managed-by-origin-location': `url:https://${host}/projects/other-project/repos/other-repo/browse/catalog-info.yaml`,
            },
            name: 'generated-d8d4944c30c2906dfee172ddda9537f9893b2c0f',
          },
          spec: {
            presence: 'optional',
            target: `https://${host}/projects/other-project/repos/other-repo/browse/catalog-info.yaml`,
            type: 'url',
          },
        },
        locationKey: 'bitbucketServer-provider:mainProvider',
      },
    ];

    expect(entityProviderConnection.applyMutation).toHaveBeenCalledTimes(1);
    expect(entityProviderConnection.applyMutation).toHaveBeenCalledWith({
      type: 'full',
      entities: expectedEntities,
    });
  });

  it('fail without schedule and scheduler', () => {
    const config = new ConfigReader({
      catalog: {
        providers: {
          bitbucketServer: {
            host: 'bitbucket.mycompany.com',
          },
        },
      },
      integrations: {
        bitbucketServer: [
          {
            host: 'bitbucket.mycompany.com',
          },
        ],
      },
    });

    expect(() =>
      BitbucketServerEntityProvider.fromConfig(config, {
        logger,
      }),
    ).toThrow('Either schedule or scheduler must be provided');
  });

  it('fail with scheduler but no schedule config', () => {
    const scheduler = {
      createScheduledTaskRunner: (_: any) => jest.fn(),
    } as unknown as PluginTaskScheduler;
    const config = new ConfigReader({
      catalog: {
        providers: {
          bitbucketServer: {
            host: 'bitbucket.mycompany.com',
          },
        },
      },
      integrations: {
        bitbucketServer: [
          {
            host: 'bitbucket.mycompany.com',
          },
        ],
      },
    });

    expect(() =>
      BitbucketServerEntityProvider.fromConfig(config, {
        logger,
        scheduler,
      }),
    ).toThrow(
      'No schedule provided neither via code nor config for bitbucketServer-provider:default',
    );
  });

  it('apply full update with schedule in config', async () => {
    const config = new ConfigReader({
      integrations: {
        bitbucketServer: [
          {
            host: host,
          },
        ],
      },
      catalog: {
        providers: {
          bitbucketServer: {
            mainProvider: {
              host: host,
              schedule: {
                frequency: 'PT30M',
                timeout: {
                  minutes: 3,
                },
              },
            },
          },
        },
      },
    });
    const schedule = new PersistingTaskRunner();
    const scheduler = {
      createScheduledTaskRunner: (_: any) => schedule,
    } as unknown as PluginTaskScheduler;
    const entityProviderConnection: EntityProviderConnection = {
      applyMutation: jest.fn(),
      refresh: jest.fn(),
    };
    const provider = BitbucketServerEntityProvider.fromConfig(config, {
      logger,
      scheduler,
    })[0];
    expect(provider.getProviderName()).toEqual(
      'bitbucketServer-provider:mainProvider',
    );

    setupStubs(
      [
        { key: 'project-test', repos: ['repo-test'] },
        { key: 'other-project', repos: ['other-repo'] },
      ],
      `https://${host}`,
    );
    await provider.connect(entityProviderConnection);

    const taskDef = schedule.getTasks()[0];
    expect(taskDef.id).toEqual('bitbucketServer-provider:mainProvider:refresh');
    await (taskDef.fn as () => Promise<void>)();

    const expectedEntities = [
      {
        entity: {
          apiVersion: 'backstage.io/v1alpha1',
          kind: 'Location',
          metadata: {
            annotations: {
              'backstage.io/managed-by-location': `url:https://${host}/projects/project-test/repos/repo-test/browse/catalog-info.yaml`,
              'backstage.io/managed-by-origin-location': `url:https://${host}/projects/project-test/repos/repo-test/browse/catalog-info.yaml`,
            },
            name: 'generated-77f4323822420990f8c3e3c981d38c2dec4ae3a6',
          },
          spec: {
            presence: 'optional',
            target: `https://${host}/projects/project-test/repos/repo-test/browse/catalog-info.yaml`,
            type: 'url',
          },
        },
        locationKey: 'bitbucketServer-provider:mainProvider',
      },
      {
        entity: {
          apiVersion: 'backstage.io/v1alpha1',
          kind: 'Location',
          metadata: {
            annotations: {
              'backstage.io/managed-by-location': `url:https://${host}/projects/other-project/repos/other-repo/browse/catalog-info.yaml`,
              'backstage.io/managed-by-origin-location': `url:https://${host}/projects/other-project/repos/other-repo/browse/catalog-info.yaml`,
            },
            name: 'generated-d8d4944c30c2906dfee172ddda9537f9893b2c0f',
          },
          spec: {
            presence: 'optional',
            target: `https://${host}/projects/other-project/repos/other-repo/browse/catalog-info.yaml`,
            type: 'url',
          },
        },
        locationKey: 'bitbucketServer-provider:mainProvider',
      },
    ];

    expect(entityProviderConnection.applyMutation).toHaveBeenCalledTimes(1);
    expect(entityProviderConnection.applyMutation).toHaveBeenCalledWith({
      type: 'full',
      entities: expectedEntities,
    });
  });

  it('Multiple location entities to deferred entities', async () => {
    const schedule = new PersistingTaskRunner();
    const config = new ConfigReader({
      catalog: {
        providers: {
          bitbucketServer: {
            host: host,
          },
        },
      },
      integrations: {
        bitbucketServer: [
          {
            host: host,
          },
        ],
      },
    });
    const providers = BitbucketServerEntityProvider.fromConfig(config, {
      logger,
      schedule,
    });

    expect(providers).toHaveLength(1);
    expect(providers[0].getProviderName()).toEqual(
      'bitbucketServer-provider:default',
    );

    const locationEntities = [
      {
        apiVersion: 'backstage.io/v1alpha1',
        kind: 'Location',
        metadata: {
          annotations: {
            'backstage.io/managed-by-location': `url:https://${host}/projects/project-test/repos/repo-test/browse/catalog-info.yaml`,
            'backstage.io/managed-by-origin-location': `url:https://${host}/projects/project-test/repos/repo-test/browse/catalog-info.yaml`,
            [`${host}/repo-url`]: `https://${host}/projects/project-test/repos/repo-test/browse/catalog-info.yaml`,
          },
          name: 'generated-77f4323822420990f8c3e3c981d38c2dec4ae3a6',
        },
        spec: {
          presence: 'optional',
          target: `https://${host}/projects/project-test/repos/repo-test/browse/catalog-info.yaml`,
          type: 'url',
        },
      },
      {
        apiVersion: 'backstage.io/v1alpha1',
        kind: 'Location',
        metadata: {
          annotations: {
            'backstage.io/managed-by-location': `url:https://${host}/projects/other-project/repos/other-repo/browse/catalog-info.yaml`,
            'backstage.io/managed-by-origin-location': `url:https://${host}/projects/other-project/repos/other-repo/browse/catalog-info.yaml`,
            [`${host}/repo-url`]: `https://${host}/projects/other-project/repos/other-repo/browse/catalog-info.yaml`,
          },
          name: 'generated-d8d4944c30c2906dfee172ddda9537f9893b2c0f',
        },
        spec: {
          presence: 'optional',
          target: `https://${host}/projects/other-project/repos/other-repo/browse/catalog-info.yaml`,
          type: 'url',
        },
      },
    ];

    const deferredEntities = toDeferredEntities(
      locationEntities,
      providers[0].getProviderName(),
    );

    expect(deferredEntities).toEqual([
      {
        locationKey: providers[0].getProviderName(),
        entity: locationEntities[0],
      },
      {
        locationKey: providers[0].getProviderName(),
        entity: locationEntities[1],
      },
    ]);
  });

  it('refresh onRepoPush', async () => {
    const schedule = new PersistingTaskRunner();
    const keptModule = createLocationEntity(
      test1RepoUrl,
      `/kept-module:${targetPath}`,
    );
    const entityProviderConnection: EntityProviderConnection = {
      applyMutation: jest.fn(),
      refresh: jest.fn(),
    };

    setupRepositoryReqHandler();

    const config = new ConfigReader({
      integrations: {
        bitbucketServer: [
          {
            host: host,
          },
        ],
      },
      catalog: {
        providers: {
          bitbucketServer: {
            mainProvider: {
              host: host,
              apiBaseUrl: `https://${host}/rest/api/1.0`,
              catalogPath: `/kept-module:/catalog-info.yaml`,
            },
          },
        },
      },
    });

    server.use(
      rest.get(
        `https://${host}/rest/api/1.0/projects/TEST/repos/test1`,
        (_, res, ctx) => {
          const response = {
            slug: 'test1',
            id: 1,
            name: 'test1',
            project: {
              key: 'TEST',
              id: 1,
              name: 'TEST',
              links: {
                self: [
                  {
                    href: `https://${host}/projects/TEST`,
                  },
                ],
              },
            },
            links: {
              self: [
                {
                  href: `${test1RepoUrl}`,
                },
              ],
            },
          };
          return res(ctx.json(response));
        },
      ),
    );

    const catalogApi = {
      getEntities: async (
        request: { filter: Record<string, string> },
        options: { token: string },
      ): Promise<{ items: Entity[] }> => {
        if (
          options.token !== 'fake-token' ||
          request.filter.kind !== 'Location' ||
          request.filter[`metadata.annotations.${host}/repo-url`] !==
            `${test1RepoUrl}/kept-module:${targetPath}`
        ) {
          return { items: [] };
        }
        return {
          items: [keptModule],
        };
      },
    };
    const provider = BitbucketServerEntityProvider.fromConfig(config, {
      catalogApi: catalogApi as any as CatalogApi,
      logger,
      schedule,
      tokenManager,
    })[0];

    await provider.connect(entityProviderConnection);
    await provider.onEvent(repoPushEventParams);

    expect(entityProviderConnection.refresh).toHaveBeenCalledTimes(1);
    expect(entityProviderConnection.refresh).toHaveBeenCalledWith({
      keys: [`url:${test1RepoUrl}/kept-module:${targetPath}`],
    });
    expect(entityProviderConnection.applyMutation).toHaveBeenCalledTimes(0);
  });

  it('onRepoPush fail on incomplete setup', async () => {
    const config = new ConfigReader({
      integrations: {
        bitbucketServer: [
          {
            host: host,
          },
        ],
      },
      catalog: {
        providers: {
          bitbucketServer: {
            mainProvider: {
              host: host,
              apiBaseUrl: `https://${host}/rest/api/1.0`,
            },
          },
        },
      },
    });
    const schedule = new PersistingTaskRunner();
    const provider = BitbucketServerEntityProvider.fromConfig(config, {
      logger,
      schedule,
    })[0];
    await expect(provider.onEvent(repoPushEventParams)).rejects.toThrow(
      'bitbucketServer-provider:mainProvider not well configured to handle repo:push. Missing CatalogApi and/or TokenManager.',
    );
  });

  it('add onRepoPush', async () => {
    const schedule = new PersistingTaskRunner();
    setupRepositoryReqHandler();
    const addedModule = createLocationEntity(
      test1RepoUrl,
      `/added-module:${targetPath}`,
    );

    const entityProviderConnection: EntityProviderConnection = {
      applyMutation: jest.fn(),
      refresh: jest.fn(),
    };

    const config = new ConfigReader({
      integrations: {
        bitbucketServer: [
          {
            host: host,
          },
        ],
      },
      catalog: {
        providers: {
          bitbucketServer: {
            mainProvider: {
              host: host,
              apiBaseUrl: `https://${host}/rest/api/1.0`,
              catalogPath: `/added-module:/catalog-info.yaml`,
            },
          },
        },
      },
    });

    const catalogApi = {
      getEntities: async (
        _request: { filter: Record<string, string> },
        _options: { token: string },
      ): Promise<{ items: Entity[] }> => {
        return {
          items: [],
        };
      },
    };
    const provider = BitbucketServerEntityProvider.fromConfig(config, {
      catalogApi: catalogApi as any as CatalogApi,
      logger,
      schedule,
      tokenManager,
    })[0];

    await provider.connect(entityProviderConnection);
    await provider.onEvent(repoPushEventParams);
    const addedEntities = [
      {
        entity: addedModule,
        locationKey: 'bitbucketServer-provider:mainProvider',
      },
    ];
    const removedEntities: DeferredEntity[] = [];

    expect(entityProviderConnection.refresh).toHaveBeenCalledTimes(1);
    expect(entityProviderConnection.refresh).toHaveBeenCalledWith({
      keys: [],
    });
    expect(entityProviderConnection.applyMutation).toHaveBeenCalledTimes(1);
    expect(entityProviderConnection.applyMutation).toHaveBeenCalledWith({
      type: 'delta',
      added: addedEntities,
      removed: removedEntities,
    });
  });
});
