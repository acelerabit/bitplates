import { Encrypter } from '@/application/cryptography/encrypter';
import { BadRequestException, Injectable } from '@nestjs/common';
import { Response } from 'express';
import { User } from './../../entities/user';
import { UserRepository } from '@/application/repositories/user-repository';

interface LoginWithGoogleRequest {
  email: string;
}

interface LoginWithGoogleResponse {
  accessToken: string;
  user: User;
}

@Injectable()
export class LoginWithGoogle {
  constructor(
    private usersRepository: UserRepository,
    private encrypter: Encrypter,
  ) {}

  async execute(
    request: LoginWithGoogleRequest,
  ): Promise<LoginWithGoogleResponse> {
    const { email } = request;

    const user = await this.usersRepository.findByEmail(email);

    if (!user) {
      throw new BadRequestException('Usuário não encontrado', {
        cause: new Error('Usuário não encontrado'),
        description: 'Usuário não encontrado',
      });
    }

    const token = await this.encrypter.encrypt({
      id: user.id,
      email: user.email,
    });

    delete user.password;

    return { accessToken: token, user };
  }

  async logout(res: Response) {
    return res.send({ message: 'Usuário deslogado com suceeso' });
  }
}
