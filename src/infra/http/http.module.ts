import { Module } from '@nestjs/common';
import { UsersController } from './controllers/users/users.controller';
import { CreateUser } from 'src/application/usecases/users/create-user';
import { DatabaseModule } from '../database/database.module';

@Module({
  imports: [DatabaseModule],
  controllers: [UsersController],
  providers: [CreateUser],
})
export class HttpModule {}
