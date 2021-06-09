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
