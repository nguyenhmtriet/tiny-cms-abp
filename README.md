# How to run

## Step 1
In appsettings.json of the **Interview.AbpCMS.DbMigrator** project. Please change to your host & port, currently we're using docker container to access MSSQL Server container.

After your database is active. Then please set the project as Startup project and run it to seed data.

## Step 2
In appsettings.json of the **Interview.AbpCMS.HttpApi.Host** project. Please change the ConnectionString to sql server as the same with the **Interview.AbpCMS.DbMigrator** project. 

Last step to run it.
