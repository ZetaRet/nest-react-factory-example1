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
- nest  
- nest-knexjs  
- knex  
- pg  
- mysql2  
- zod  
- react  
- react-router  

In addition to the above you might decide to use PostgreSQL and pgAdmin instead of mysql:  
- postgresql server 14.13  
- pgAdmin 4 version 8.12  


Describe password reset and `trust` localhost using `ALTER USER postgres WITH PASSWORD 'newpassword';` by looking on the internet support pages on the topic of no password login or forgot password.  
Lookup `/etc/postgresql/VERSION/main/pg_hba.conf` as a root and change the table with `trust` by backuping the file or keeping it copy-paste on the side of `xed`.  
Type in terminal after `sudo su` the following lines `psql -U postgres -W  -h localhost` to login locally and check `systemctl enable/start/stop/status servicename` for system services first. This will login without password in the pgsql terminal then type your new password, i.e. `postgres` as the username in the line for password reset, revert previous `pg_hba.conf` and restart the postgresql service.  
Now repeat the step in terminal to ensure login with the same password and exit with `\q` and save new server in pgAdmin4 with the changed password.  

## Nest

Create new nest project in parent projects folder using `nest new nest-backend` after `cd ./../` and use its contents along with `react-frontend` to assemble the nested react project. This will install all `node_modules` automatically. Enter `cd ./nest-backend/` and save in zip for later if you wish using `zip -r node_modules.zip node_modules`, the method is useful for both `vendor` folder and node.  

To install react use `npx create-react-app react-frontend` in the parent projects folder and enter openssh password if prompted.  
Another way is to startup with webpack and babel. Get back to the parent projects folder and type `mkdir react-frontend-webpack` and `cd react-frontend-webpack/`. Continue the installation with `npm init -y` then `npm install react react-dom` and `npm install webpack webpack-cli webpack-dev-server babel-loader @babel/core @babel/preset-env @babel/preset-react html-webpack-plugin --save-dev` finally `npm install style-loader css-loader --save-dev`. This method requires configuration of webpack and babel files, creation of first react components and html template including any npm scripts.  
