import {ConnectionOptions} from 'typeorm';
import 'dotenv/config';

console.log("env run as======",process.env.NODE_ENV)
console.log("env file DB_HOST/DB_PORT======",process.env.DB_HOST+"/"+process.env.DB_PORT)
console.log("env file DB_USER/DB_PASS======",process.env.DB_USER+"/"+process.env.DB_PASS)
console.log("env file DB_NAME======",process.env.DB_NAME)
// Check typeORM documentation for more information.
const ormconfig: ConnectionOptions = {
  type: 'postgres',
  host: process.env.DB_HOST,
  port: parseInt(process.env.DB_PORT),
  username: process.env.DB_USER,
  password: String(process.env.DB_PASS),
  database: process.env.DB_NAME,
  entities: [__dirname + '/**/*.entity{.ts,.js}'],

  // We are using migrations, synchronize should be set to false.
  synchronize: false,

  // Run migrations automatically,
  // you can disable this if you prefer running migration manually.
  migrationsRun: false,
  logging: true,
  logger: 'file',

  // Allow both start:prod and start:dev to use migrations
  // __dirname is either dist or src folder, meaning either
  // the compiled js in prod or the ts in dev.
  migrations: [__dirname + '/migrations/**/*{.ts,.js}'],
  cli: {
    // Location of migration should be inside src folder
    // to be compiled into dist/ folder.
    migrationsDir: 'src/migrations',
  },
};

export = ormconfig;