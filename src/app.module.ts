import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ContactsModule } from './contacts/contacts.module';

import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [ContactsModule,       
    TypeOrmModule.forRoot({
     type: "postgres",
     host: "localhost",
     port: 5432,
     username: "postgres",
     password: "12345678",
     database: "alaatest",
     synchronize: true,
     logging: true,
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
   }),],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}