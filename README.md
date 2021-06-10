# ===== 10062021 5=========
#  use many env files to configure project for development,staging and production with simple commands
- npm i env-cmd
- add .production.env and .staging.env files .
- add three new script to package.json file .
- we can now run our project with one of three modes :
* for production : npm run prod
* for staging : npm run staging
* for development : npm run dev


# ===== 10062021 4=========
#  use env file to configure project and access setting
- npm i --save dotenv
- add .env file
- add database connection settings to env / add server port number
- modify ormconfig.ts file to get database connection settings from env file
- modify main.ts to get port number from env file

# ===== 10062021 3=========
#  not important ... remove unused lines from todoController
- Fixes 

# ===== 10062021 2=========
#  Users and Authentication Step 1
# creating all database users functionality without authentication APIs yet

- https://www.codemag.com/Article/2001081/Nest.js-Step-by-Step-Part-3-Users-and-Authentication
- For user authentication, I've chosen to use the Passport.js module. By far, this is the most popular and flexible Node.js authentication module because it supports a variety of authentication strategies ranging from Local Strategy, to JWT Strategy to Google Authentication Strategy and other Social Media authentication strategies.

- npm i --save bcrypt @nestjs/passport @nestjs/jwt passport passport-jwt
- npm i @types/bcrypt @types/passport @types/passport-jwt -D 
- create users module/service/entity/dto for login,create and user info 
- npm run typeorm:migrate "Add users table"
- npm run typeorm:run ... this will create users table in database
- add to mapper toUserDto

# ===== 10062021 1=========
#  Dependency injection and provider in Nest.js
- no code changes here just ... article for more understanding
- https://www.programmersought.com/article/6406825702/

# ===== 08062021 2=========
#  Use ValidationPipe

- npm i --save  class-transformer class-validator
- make validation example for todo create/update body request parameters
- we use todocontroller and todo create DTO for that
- display custom message when validation failed
- https://github.com/typestack/class-validator

# ===== 08062021 1=========
# Add todo list and tasks to this project

- configer tsconfig to call paths by @
- install npm i --save class-validator for dto validation
- create todo/task DTO
- create todo/task module,controller and service
- create mapper and utils
- execute for generate migration new todo/task : npm run typeorm:migrate "update with todo"
- execute for migrate with database : npm run typeorm migration:run
- check database for new tables todo and task ... done
- test todo GET/POST/PUT/DELETE
- test task GET/POST/PUT/DELETE

# ===== 06062021 3=========
# how to use migrations feature of TypeORM with NestJS

- https://awesomeopensource.com/project/ambroiseRabier/typeorm-nestjs-migration-example
- create src/ormconfig.ts to configer connecting with database
- update app module to use ormconfig
- update package.json with script needed for migration
- run : npm run typeorm:migrate <migrationName> 
- this command will create migration file inside src/migrations 
- note : if no databasse change this command will return error and no generation
-  synchronize: false, disabled inside ormconfig to prevent auto migration
- inside ormconfig you can disable this if you prefer running migration manually.
  migrationsRun: true,
  when it is true migration will automaticly happen on npm run start
- now running npm run typeorm:run will create contact and migration tables in database
- for error can not find dist module we should run : npm run prebuild
- when run npm run typeorm:run if no database change nothing will happen .

# ===== 06062021 2=========
#  Creating a CRUD Service

- we inject the Contact repository via the constructor of the service module.
- inside service module define methods : findAll/create/update/delete
- inside controller module define GET/POST/PUT/DELETE APIs


# ===== 06062021 =========
#  nestjs install typeorm / configer and connect database

- npm install --save @nestjs/typeorm typeorm pg
- nest generate module contacts
- nest generate controller contacts
- nest generate service contacts
- configure app.module to connect database with synchronization enabled
- create contact entity and import in contacts module with TypeOrmModule.forFeature
- fix : Parsing error: Cannot read file ' tsconfig.json
( add to .eslintrc.js   
parserOptions: {
    project: 'tsconfig.json',
    tsconfigRootDir: __dirname,
    sourceType: 'module',
  },
  )

# ===== 05062021 =========
# create basic server with nestjs 
- first run with hello world using command as start of implementation of article :
https://www.techiediaries.com/nestjs-tutorial-rest-api-crud/
