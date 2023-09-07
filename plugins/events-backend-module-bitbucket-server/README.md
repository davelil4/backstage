# events-backend-module-bitbucket-server

Welcome to the `events-backend-module-bitbucket-server` backend plugin!

This plugin is a module for the `events-backend` backend plugin
and extends it with an `BitbucketServerEventRouter`.

The event router will subscribe to the topic `bitbucketServer`
and route the events to more concrete topics based on the value
of the provided `x-event-key` metadata field.

Examples:

| x-event-key         | topic                               |
| ------------------- | ----------------------------------- |
| `repo:refs_changed` | `bitbucketServer.repo:refs_changed` |
| `repo:modified`     | `bitbucketServer.repo:modified`     |
| `pr:opened`         | `bitbucketServer.pr:opened`         |

Please find all possible webhook event types at the
[official documentation](https://confluence.atlassian.com/bitbucketserver/event-payload-938025882.html).

## Installation

# Setting up the router

Install the [`events-backend` plugin](../events-backend/README.md).

Install this module:

```bash
# From your Backstage root directory
yarn add --cwd packages/backend @backstage/plugin-events-backend-module-bitbucket-server
```

Add the event router to the `EventsBackend` instance in `packages/backend/src/plugins/events.ts`:

```diff
+const bitbucketServerEventRouter = new BitbucketServerEventRouter();

new EventsBackend(env.logger)
+  .addPublishers(bitbucketServerEventRouter)
+  .addSubscribers(bitbucketServerEventRouter);
// [...]
```

# Setting up the Btibucket Server Provider

Set up your provider

```ts title="packages/backend/src/plugins/catalog.ts"
import { CatalogBuilder } from '@backstage/plugin-catalog-backend';
/* highlight-add-start */
import { BitbucketServerEntityProvider } from '@backstage/plugin-catalog-backend-module-bitbucket-server';
/* highlight-add-end */

import { ScaffolderEntitiesProcessor } from '@backstage/plugin-scaffolder-backend';
import { Router } from 'express';
import { PluginEnvironment } from '../types';

export default async function createPlugin(
  env: PluginEnvironment,
): Promise<Router> {
  const builder = await CatalogBuilder.create(env);
  builder.addProcessor(new ScaffolderEntitiesProcessor());
  /* highlight-add-start */
  const bitbucketServerProvider = BitbucketServerEntityProvider.fromConfig(
    env.config,
    {
      catalogApi: new CatalogClient({ discoveryApi: env.discovery }),
      logger: env.logger,
      scheduler: env.scheduler,
      tokenManager: env.tokenManager,
      eventBroker: env.eventBroker, // Optional
    },
  );
  env.eventBroker.subscribe(bitbucketServerProvider);
  builder.addEntityProvider(bitbucketServerProvider);
  /* highlight-add-end */
  const { processingEngine, router } = await builder.build();
  await processingEngine.start();
  return router;
}
```

# Setting up app-config.yaml

Include the `bitbucketServer` as follows:

```yaml
events:
  http:
    topics:
      - bitbucketServer
      # other topics...
```
