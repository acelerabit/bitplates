import { Body, Controller, Post } from '@nestjs/common';
import { CreateUserBody } from './dtos/create-user-body';
import { CreateUser } from 'src/application/usecases/users/create-user';

@Controller('users')
export class UsersController {
  constructor(private createUser: CreateUser) {}

  @Post()
  async create(@Body() body: CreateUserBody) {
    const { name, email } = body;

    await this.createUser.execute({
      name,
      email,
    });

    return;
  }
}
