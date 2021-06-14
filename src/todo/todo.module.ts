import { Module } from '@nestjs/common';
import { TodoController } from './todo.controller';
import { TodoService } from './todo.service';
import { TaskController } from './task/task.controller';
import { TaskService } from './task/task.service';
import { TodoEntity } from '@todo/entity/todo.entity';
import { TaskEntity } from '@todo/entity/task.entity';
import { TypeOrmModule } from '@nestjs/typeorm'; 
import { UsersModule } from '@user/users.module';
import { AuthModule } from 'src/auth/auth.module';
import { UserEntity } from '@user/entity/user.entity';

@Module({
  imports: [ 
    UsersModule,
    AuthModule,
    TypeOrmModule.forFeature([TodoEntity, TaskEntity , UserEntity]),
  ],
  controllers: [TodoController, TaskController],
  providers: [TodoService, TaskService],
})
export class TodoModule {}
