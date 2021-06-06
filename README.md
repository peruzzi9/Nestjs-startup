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
