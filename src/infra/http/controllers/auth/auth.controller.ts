import { Body, Controller, Post } from '@nestjs/common';
import { AuthenticateUserBody } from './dtos/authenticate-user-body';
import { AuthenticateUserWithGoogleBody } from './dtos/authenticate-with-google-body';
import { LoginUser } from '@/application/usecases/authenticate/login-user';
import { LoginWithGoogle } from '@/application/usecases/authenticate/login-with-google';

@Controller('auth')
export class AuthController {
  constructor(
    private loginUser: LoginUser,
    private loginWithGoogle: LoginWithGoogle,
  ) {}

  @Post('/login')
  async login(@Body() body: AuthenticateUserBody) {
    const { email, password } = body;

    const { accessToken, user } = await this.loginUser.execute({
      email,
      password,
    });

    return {
      access_token: accessToken,
      user: {
        id: user.id,
        email: user.email,
        createdAt: user.createdAt,
      },
    };
  }

  @Post('/login-with-google')
  async google(@Body() body: AuthenticateUserWithGoogleBody) {
    const { email } = body;

    const { accessToken, user } = await this.loginWithGoogle.execute({
      email,
    });

    return {
      access_token: accessToken,
      user: {
        id: user.id,
        email: user.email,
        createdAt: user.createdAt,
      },
    };
  }
}
