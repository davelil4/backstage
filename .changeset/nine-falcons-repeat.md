---
'@backstage/plugin-catalog-backend-module-bitbucket-server': minor
'@backstage/plugin-events-backend-module-bitbucket-server': minor
---

Added the ability for the plugin to receive events coming from Bitbucket Server push webhooks. It then performs a delta mutation on the catalog and optionally releases another event in case another plugin needs depends on an event from a change derived from this plugin.
