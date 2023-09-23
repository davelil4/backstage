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

/** @public */
export type BitbucketServerRepository = {
  project: {
    key: string;
  };
  slug: string;
  description: string;
  links: Record<
    string,
    {
      href: string;
    }[]
  >;
};

/** @public */
export type BitbucketServerProject = {
  key: string;
};

/** @public */
export namespace BitbucketServerEvents {
  export interface Event {
    eventKey: string;
  }

  export interface RefsChangedEvent extends Event {
    date: string;
    actor: Actor;
    repository: Repository;
    changes: Change[];
    commits: undefined;
    ToCommit: undefined;
  }
  export type Actor = {
    name?: string;
    id: number;
  };
  export type Change = {
    ref: { id: string; displayId: string; type: string };
  };
  export type Repository = {
    slug: string;
    id: number;
    name: string;
    project: BitbucketServerProject;
  };
}
