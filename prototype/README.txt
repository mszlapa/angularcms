start with node app/start.js
browser localhost:3000


STATUS
Renders dynamic page based on url, page template is dynamically populated with widgets based on cms definition

=====

TODO Backend
REST operations
- Query all objects of specific type ie  list all pages for menu
- PUT create
- POST save changes
- validation on save against schema

WORKSPACES/BRANCHES
- changes saved users workspace
- see unchanged files directly from trunk
- locking?


CONTENT EVOLUTION
- promote 'push/merge' from workspace to trunk w/o conflict resolution
- forward compatibly JSON schema changes automatically upgrades existing content
- merge conflict resolution

=====

TODO Frontend
- cms object editor based on json schema
- edit/save/delete
- live preview