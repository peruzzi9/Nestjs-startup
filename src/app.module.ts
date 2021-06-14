import { DynamicModule, MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import * as ormconfig from './ormconfig';

import { ContactsModule } from './contacts/contacts.module'; 
import { TodoModule } from './todo/todo.module'; 
import { UsersModule } from '@user/users.module';
import { AuthModule } from './auth/auth.module';
import { LoggerMiddleware } from './logger.middleware';


/* export function DatabaseOrmModule(): DynamicModule {
  // we could load the configuration from dotEnv here,
  // but typeORM cli would not be able to find the configuration file.

  return TypeOrmModule.forRoot(ormconfig);
}
 */
@Module({
  imports: [
    ContactsModule,
    TodoModule,
    UsersModule,
    AuthModule,
    TypeOrmModule.forRoot(ormconfig)
    // or
    // DatabaseOrmModule(),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements NestModule {
  // add Middleware for logging every request
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(LoggerMiddleware)
      .forRoutes('/');
  }
}
