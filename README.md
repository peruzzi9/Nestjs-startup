# ===== 21062021 1=========
#  Update user login to use email instead of username

- update loginDto and service login function to search for email .
- update all login and register to check for email instead of username
- update todo to check for user id instead of username
- update create token to generate token using user id instead of username .
- update jwtpayload to use id instead of username for jwtstrategy user validate >
- make username not unique and generate/run migration with database .

# ===== 17062021 1=========
#  SECURITY :::: Protect server
- https://bluebits.dev/2021/06/03/how-to-make-nodejs-web-api-secure/?fbclid=IwAR3bcS1nJXVb9vJuCsh-isV6jYAPPP8TMEIzSThwHhJdOG-vcosZ7qq9fjY
-  Protect  application from uploading files larger then 50mb .
-  Protect  application API request form body attack larger than 100kb
-  Protect  application from scripts : prevent users from inserting HTML & Scripts on input / prevent XSS attacks .
-  https://www.npmjs.com/package/xss
- Apply validation for all inputs globally (app.useGlobalPipes(
    new ValidationPipe({.... )
- read this : http://www.mianshigee.com/tutorial/nestjs-6.0-en/techniques-validation.md
- read this : https://l4mp1.medium.com/difference-between-xss-and-csrf-attacks-ff29e5abcd33
- also read this : https://itnext.io/how-to-secure-your-web-applications-part-1-cpas-3-715b72973623
- to be continued ....

# ===== 15062021 1=========
#  Make custom API Response 
- like :
{
  code : 200,
  result : object[]
}
or 
{
  code : 400,
  error : 'no result'
- make this example on login API

# ===== 14062021 2=========
#  SECURITY :::: Helmet / rateLimit / enableCors
- Helmet
- https://github.com/helmetjs/helmet
- https://docs.nestjs.com/security/helmet
- Helmet can help protect your app from some well-known web vulnerabilities by setting HTTP headers appropriately. Generally, Helmet is just a collection of 14 smaller middleware functions that set security-related HTTP headers

- Cross-origin
- https://docs.nestjs.com/security/cors
- https://github.com/expressjs/cors#configuration-options
- Cross-origin resource sharing (CORS) is a mechanism that allows resources to be requested from another domain.
- Important Note : An alternative to CORS headers is to standup a webserver such as Nginix on your computer and proxy all your requests through it, forwarding to the appropriate port based on a url root. This is how things are normally approached in the real world as the CORS headers are relatively new and can open security holes you may not want by default.

This solves the fundamental problem that is your application is running on a different Origin (protocol + domain + port) than the api you want to access.

- Rate Limiting
- https://www.npmjs.com/package/express-rate-limit
- https://docs.nestjs.com/security/rate-limiting
- A common technique to protect applications from brute-force attacks is rate-limiting.Basic rate-limiting middleware for Express. Use to limit repeated requests to public APIs and/or endpoints such as password reset.

- CSRF Protection
- https://docs.nestjs.com/security/csrf
Cross-site request forgery (also known as CSRF or XSRF) is a type of malicious exploit of a website where unauthorized commands are transmitted from a user that the web application trusts. To mitigate this kind of attack you can use the csurf package.



# ===== 14062021 1=========
#  add some new comments to describe Authentication

# ===== 13062021 2=========
#  Users Must Be Logged-In to Create a New To-Do Item
#  API protection with token
- add  UserEntity to forFeature and  Import the UsersModule and AuthModule into the TodoModule
- By importing the AuthModule, you'll be able to make use of AuthGuard() to protect the Route Handlers and force a logged-in user.
- add owner property to todoentity with relation .
- The owner property is of type UserEntity. The @ManyToOne() decorates this new property to signal to TypeORM module to store the User ID on the Todo table and configure it as a Foreign Key. Every user can own one or more To Do items and in return, every To Do is owned by one and only one user.
- add owner property to tododto  of type userdto
- add owner property to toTodoDto inside mapper  of type userdto
- update database : 
- npm run "typeorm:migrate" AddOwnerColumnToTodoTable
- npm run "typeorm:run"
- update todocontroller with AuthGuard() for create new todo
- update todoservice to use user on create new todo item

- create new todo by api by :
- add the Authorization request header, otherwise, Nest.js won't be able to find the token and it won't authenticate the request. The authorization header should look similar to this (except without the line breaks forced by the printing process)
- in postman header : Authorization = Brearer TOKEN

- catch all requests coming to server and display in console  BY :
- create LoggerMiddleware to print every request path on console
- and use this middleware in app module
- https://github.com/nestjs/nest/issues/912



# ===== 13062021 1=========
#  Users and Authentication Step 2
# Building the AuthModule ... Auth APIs
- https://www.codemag.com/Article/2001081/Nest.js-Step-by-Step-Part-3-Users-and-Authentication

- Create the Auth Module that will eventually expose the /auth endpoint to allow user registration, login, and privacy protection in your application.

- the JWT Strategy extracts the token and validates it. 
- test user registration and login APIs 

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
