## Install

Following the installation by [`laravel-example1`](https://github.com/ZetaRet/laravel-example1/) for `linux mint` with `ubuntu jammy` and [`protoss-nodejs-basic`](https://github.com/ZetaRet/protoss-nodejs-basic/) HowTo Wiki about `apache2` server configuration.  

Use of currently installed software:  
- mysql community server 8  
- mysql workbench 8  
- apache2 version 2.4.52  
- node 19.9.0  
- npm 9.6.3  
- VSCode or code 1.95.2  
- TypeScript 5.6  
- chrome 130  
- postman 10 (non cloud version)  

__Global__ npm install (npm install -g name):  
- nest 10.4.7 (@nestjs/cli)  
- prettier 3.3.3 (prettier)  
- knex 3.1.0 (knex)  
- node (@types/node)  

__Nest__ npm __package.json__ install:  
- @types/node  
- @types/express  
- nest 10.4.7  
- nest-knexjs 0.0.24  
- @nestjs/config 3.3.0  
- @nestjs/serve-static 4.0.2  
- knex 3.1.0  
- pg 8.13.1  
- mysql2 3.11.4  
- zod 3.23.8  

__React__ npm __package.json__ install:  
- react 18.3.1  
- react-dom 18.3.1  
- react-router 6.28.0  
- @babel/core 7.26.0  
- @babel/preset-react 7.25.9  
- babel-loader 9.2.1  
- webpack 5.96.1  
- webpack-cli 5.1.4  

In addition to the above you might decide to use __PostgreSQL__ and pgAdmin instead of mysql:  
- postgresql server 14.13  
- pgAdmin 4 version 8.12  


Describe password reset and `trust` localhost using `ALTER USER postgres WITH PASSWORD 'newpassword';` by looking on the internet support pages on the topic of no password login or forgot password.  
Lookup `/etc/postgresql/VERSION/main/pg_hba.conf` as a root and change the table with `trust` by backuping the file or keeping it copy-paste on the side of `xed`.  
Type in terminal after `sudo su` the following lines `psql -U postgres -W  -h localhost` to login locally and check `systemctl enable/start/stop/status servicename` for system services first. This will login without password in the pgsql terminal then type your new password, i.e. `postgres` as the username in the line for password reset, revert previous `pg_hba.conf` and restart the postgresql service.  
Now repeat the step in terminal to ensure login with the same password and exit with `\q` and save new server in pgAdmin4 with the changed password.  

## Nest and React

Create new nest project in parent projects folder using `nest new nest-backend` after `cd ./../` and use its contents along with `react-frontend` to assemble the nested react project. This will install all `node_modules` automatically. Enter `cd ./nest-backend/` and save in zip for later if you wish using `zip -r node_modules.zip node_modules`, the method is useful for both `vendor` folder and node.  

To install react use `npx create-react-app react-frontend` in the parent projects folder and enter openssh password if prompted.  
Another way is to startup with webpack and babel. Get back to the parent projects folder and type `mkdir react-frontend-webpack` and `cd react-frontend-webpack/`. Continue the installation with `npm init -y` then `npm install react react-dom` and `npm install webpack webpack-cli webpack-dev-server babel-loader @babel/core @babel/preset-env @babel/preset-react html-webpack-plugin --save-dev` finally `npm install style-loader css-loader --save-dev`. This method requires configuration of webpack and babel files, creation of first react components and html template including any npm scripts.  
Shorter `npm install webpack webpack-cli babel-loader @babel/core @babel/preset-react --save-dev` as folder `react-frontend-webpack-short` with smaller configuration.  

On this level, 4 base folders exist in the projects and can be used to version and generate new ones in the future. Building the example requires `public_html` on top, `nest-backend` and `react-frontend` using separate package.json and node_modules. This method will allow any additional application programming and different frontend along react, also can come up with react on top that compiles as the main package.json and using directly the public folder. Since `react 18` render method of the app requires `createRoot` function of `react-dom/client` also encapsulate the code in `window.bodyOnLoad` and add `onload` attribute to the html template body tag by loading the main `dist/bundle.js` in the head. Webpack must add scripts for watch/production/development to the package, define the module rules, configure the output of the entry point, resolve build path in `public_html/dist` and use production mode at the end.  

All pages are loaded by the `public_html` folder using react bundle, nest must implement the api using `nest g resource name` and test it with postman.  
Knex integration as part of the service and sometimes the controller in the root module. Creation of users with password for mysql and pgadmin, schema `nest_react_example1`. Creation of first migration, testing of database and seeding. Zod validation of each request and database management using crud operations.  
If you rely on two schemas use the biserver communication choosing main and second by id with async factory to root. Usually for historical table data maintenance, archives, transfer with old or previous id, compact and optimization of database on stages.  
Just like this your app is ready for more migration, more seeding, more postman, more g resource.  
Last part of the management is writing the react with router for each navigation and ajax form, recompile, test and that's it.  
