import { Body, Controller, Post, Put, UseGuards } from '@nestjs/common';
import { CreateUserBody } from './dtos/create-user-body';
import { CreateUser } from 'src/application/usecases/users/create-user';
import { UpdateUser } from '@/application/usecases/users/update-user';
import { UpdateUserBody } from './dtos/update-user-body';
import { UsersPresenters } from './presenters/user.presenter';
import { JwtUserAuthGuard } from '@/infra/auth/jwt.guard';

@Controller('users')
export class UsersController {
  constructor(
    private createUser: CreateUser,
    private updateUser: UpdateUser,
  ) {}

  @Post()
  async create(@Body() body: CreateUserBody) {
    const { name, email, password, role } = body;

    await this.createUser.execute({
      name,
      email,
      password,
      role,
    });

    return;
  }

  @UseGuards(JwtUserAuthGuard)
  @Put()
  async update(@Body() body: UpdateUserBody) {
    const { email, id, role, name } = body;

    const { user } = await this.updateUser.execute({
      name,
      email,
      role,
      id,
    });

    return UsersPresenters.toHTTP(user);
  }
}
