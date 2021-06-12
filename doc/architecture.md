## Folder structure:

1. client-app. Folder with frontend-specific code.
2. db. Folder with database-specific code.
3. restAPI. Folder with backend-specific code.
4. doc. Folder with project-explanation files.

## Project architecture

1. Frontend is built with React.js. Have several crucial folders:
   i. features. This folder is separated by feature type. There are footer, header, homepage, main router, and stats feature-corresponding code./
   It contains stats router, user stats page, users list page and "stats" slice of Redux store where all the data related to statistics is saved.
   ii. services. This folder contains service code that talks with backend, prepare and parse data. Have one statsService that provides app with statistic-related data.
   iii. App. Contains Redux root store and root react node where redux store and routing components are provided for child nodes.

2. db. Have following structure:
   i. initData folder. There stored table data for initialization.
   ii. databasePool.js. Module that creates and exports sqlite database pool.
   iii. init.js. Module that initializes database if there is none.
   iiii. structure.sql. File with code about table structure.
3. restApi:
   i. common. Files that are not divided to some idea-specific folder
   ii. controllers. Files with express routers.
   iii. middleware. Files with express middleware functions
   iiii. services. Contains files that query specific database model.
   iiiii. index.js. Express.js server and root router.

4. pagination solved with key-set pagination and cursors that sent beetween client and server.
