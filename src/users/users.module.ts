import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UserEntity } from './entity/user.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([UserEntity])],
  controllers: [],
  providers: [UsersService],
  exports: [UsersService],
  /* 
   export the UsersService on the UsersModule so that other modules,
    specifically the AuthModule, can communicate with the database to perform its function 
    via an access to UsersService.
  */
})
export class UsersModule {}
