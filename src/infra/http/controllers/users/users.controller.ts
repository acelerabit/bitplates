import { Body, Controller, Get, Post, Put, UseGuards } from '@nestjs/common';
import { CreateUserBody } from './dtos/create-user-body';
import { CreateUser } from 'src/application/usecases/users/create-user';
import { UpdateUser } from '@/application/usecases/users/update-user';
import { UpdateUserBody } from './dtos/update-user-body';
import { UsersPresenters } from './presenters/user.presenter';
import { JwtUserAuthGuard } from '@/infra/auth/jwt.guard';
import { InjectQueue } from '@nestjs/bull';
import { EMAIL_QUEUE } from '@/common/constants';
import { Queue } from 'bull';

@Controller('users')
export class UsersController {
  constructor(
    private createUser: CreateUser,
    private updateUser: UpdateUser,
    @InjectQueue(EMAIL_QUEUE) private sendMailQueue: Queue,
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

  @Get('/send-email')
  async sendMail() {
    await this.sendMailQueue.add('sendMail-job', {
      email: 'gabrielferrsantos201@gmail.com',
      subject: 'teste',
      text: 'HELLO',
    });

    return;
  }
}
