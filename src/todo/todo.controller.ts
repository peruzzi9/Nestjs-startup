import {
  Controller,
  Get,
  Param,
  Post,
  Body,
  Put,
  Delete,
  UsePipes,
  ValidationPipe,
  UseGuards,
  Req,
} from '@nestjs/common';
import { TodoListDto } from './dto/todo.list.dto';
import { TodoDto } from './dto/todo.dto';
import { CreateTodoDto } from './dto/todo.create.dto';
import { TodoService } from './todo.service';
import { AuthGuard } from '@nestjs/passport';
import { UserDto } from '@user/dto/user.dto';

@Controller('api/todos')
export class TodoController {
  constructor(private readonly todoService: TodoService) {}

  @Get()
  @UseGuards(AuthGuard('jwt-refresh-token')) // Protect the route handlers to force a logged-in user
  async findAll(): Promise<TodoListDto> {
    const todos = await this.todoService.getAllTodo();
    return { todos };
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<TodoDto> {
    return await this.todoService.getOneTodo(id);
  }

  @Post()
  @UseGuards(AuthGuard()) // Protect the route handlers to force a logged-in user
  @UsePipes(new ValidationPipe())
  // this will make validation parameters sent inside req body
  // we benefit from createtodo dto to make this validation ... take a look there
  async create(
    @Body() createTodoDto: CreateTodoDto,
    @Req() req: any,
  ): Promise<TodoDto> {
    const user = req.user as UserDto;
    /* 
    more :  that Passport will build a user object based on the return value of our validate() method (jwt.strategy.ts),
     and attach it as a property on the Request object.
    */
    /* 
     The body of the route handler retrieves the logged-in user via req.user. 
     This information was injected into the current Request object by Passport.js middleware.
     It then passes this information to the TodoService.createTodo() function.
    */
   /* 
   * Summery :
   * Bearer Token will be sent with API request to create new todo item
   * validate() function inside jwt.strategy will retrieve user details from this token if the passed token is valid
   * then check if user exist in database and get its details
   * then attach it as a property on the Request object
   * then here we access it through req.user to use it in create new to do item
   */
    return await this.todoService.createTodo(user, createTodoDto);
  }

  @Put(':id')
  @UsePipes(new ValidationPipe())
  // this will make validation parameters sent inside req body
  // we benefit from createtodo dto to make this validation ... take a look there
  async update(
    @Param('id') id: string,
    @Body() todoDto: TodoDto,
  ): Promise<TodoDto> {
    return await this.todoService.updateTodo(id, todoDto);
  }

  @Delete(':id')
  async destory(@Param('id') id: string): Promise<TodoDto> {
    return await this.todoService.destoryTodo(id);
  }
}
