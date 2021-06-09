import { IsNotEmpty, MaxLength, IsOptional } from 'class-validator';

export class CreateTodoDto {
  @IsNotEmpty({
    message: 'Name can not be empty',
  })
  name: string;

  @IsOptional()
  @MaxLength(100, {
    // here, $constraint1 will be replaced with "50", and $value with actual supplied value
    message: 'Description is too long. Maximal length is $constraint1 characters, but actual is $value',
  })
  description?: string;
}
