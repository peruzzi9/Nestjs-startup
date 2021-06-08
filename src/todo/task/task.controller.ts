import {
  Controller,
  Param,
  Get,
  Post,
  Body,
  Delete, 
  UseGuards,
} from '@nestjs/common';
import { TaskService } from './task.service';
import { TaskListDto } from '../dto/task.list.dto';
import { TaskDto } from '../dto/task.dto';
import { CreateTaskDto } from '@todo/dto/task.create.dto'; 

@Controller('api/tasks')
export class TaskController {
  constructor(private taskService: TaskService) {}

  @Get(':id')
  async findOneTask(@Param('id') id: string): Promise<TaskDto> {
    return await this.taskService.getTask(id);
  }

  @Get('todo/:id')
  async findTasksByTodo(@Param('id') id: string): Promise<TaskListDto> {
    const tasks = await this.taskService.getTasksByTodo(id);
    return { tasks };
  }

  @Post('todo/:id') 
  async create(
    @Param('id') todo: string,
    @Body() createTaskDto: CreateTaskDto,
  ): Promise<TaskDto> {
    return await this.taskService.createTask(todo, createTaskDto);
  }

  @Delete(':id') 
  async destory(@Param('id') id: string): Promise<TaskDto> {
    return await this.taskService.destoryTask(id);
  }
}
