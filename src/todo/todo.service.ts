import { Injectable, HttpException, HttpStatus } from '@nestjs/common';

import { TodoEntity } from '@todo/entity/todo.entity';
import { TodoDto } from './dto/todo.dto';
import { toTodoDto } from '@shared/mapper';
import { CreateTodoDto } from './dto/todo.create.dto';

import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class TodoService {
  constructor(
    @InjectRepository(TodoEntity)
    private readonly todoRepo: Repository<TodoEntity>, 
  ) {}

  async getAllTodo(): Promise<TodoDto[]> {
    const todos = await this.todoRepo.find({ relations: ['tasks'] });
    return todos.map(todo => toTodoDto(todo));
  }

  async getOneTodo(id: string): Promise<TodoDto> {
    const todo = await this.todoRepo.findOne({
      where: { id },
      relations: ['tasks'],
    });

    if (!todo) {
      throw new HttpException(
        `Todo list doesn't exist`,
        HttpStatus.BAD_REQUEST,
      );
    }

    return toTodoDto(todo);
  }

  async createTodo(
    createTodoDto: CreateTodoDto,
  ): Promise<TodoDto> {
    const { name, description } = createTodoDto;

    
    const todo: TodoEntity = await this.todoRepo.create({
      name,
      description,
    });

    await this.todoRepo.save(todo);

    return toTodoDto(todo);
  }

  async updateTodo(id: string, todoDto: TodoDto): Promise<TodoDto> {
    const { name, description } = todoDto;

    let todo: TodoEntity = await this.todoRepo.findOne({ where: { id } });

    if (!todo) {
      throw new HttpException(
        `Todo list doesn't exist`,
        HttpStatus.BAD_REQUEST,
      );
    }

    todo = {
      id,
      name,
      description,
    };

    await this.todoRepo.update({ id }, todo); // update

    todo = await this.todoRepo.findOne({
      where: { id },
      relations: ['tasks'],
    }); // re-query

    return toTodoDto(todo);
  }

  async destoryTodo(id: string): Promise<TodoDto> {
    const todo: TodoEntity = await this.todoRepo.findOne({
      where: { id },
      relations: ['tasks'],
    });

    if (!todo) {
      throw new HttpException(
        `Todo list doesn't exist`,
        HttpStatus.BAD_REQUEST,
      );
    }

    if (todo.tasks && todo.tasks.length > 0) {
      throw new HttpException(
        `Cannot delete this Todo list, it has existing tasks`,
        HttpStatus.FORBIDDEN,
      );
    }

    await this.todoRepo.delete({ id }); // delete todo list

    return toTodoDto(todo);
  }
}