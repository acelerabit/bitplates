import { LoginUser } from '@/application/usecases/authenticate/login-user';
import { LoginWithGoogle } from '@/application/usecases/authenticate/login-with-google';
import { Module } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { CreateUser } from 'src/application/usecases/users/create-user';
import { CryptographyModule } from '../cryptography/cryptography.module';
import { DatabaseModule } from '../database/database.module';
import { AuthController } from './controllers/auth/auth.controller';
import { UsersController } from './controllers/users/users.controller';
import { UpdateUser } from '@/application/usecases/users/update-user';

@Module({
  imports: [DatabaseModule, CryptographyModule],
  controllers: [UsersController, AuthController],
  providers: [CreateUser, LoginUser, LoginWithGoogle, JwtService, UpdateUser],
})
export class HttpModule {}
