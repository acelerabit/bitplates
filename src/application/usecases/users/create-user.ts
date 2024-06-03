import { Injectable } from '@nestjs/common';
import { User } from 'src/application/entities/user';
import { UserRepository } from 'src/application/repositories/user-repository';

interface CreateUserRequest {
  name: string;
  email: string;
}

@Injectable()
export class CreateUser {
  constructor(private userRepository: UserRepository) {}

  async execute({ name, email }: CreateUserRequest) {
    const user = User.create({
      name,
      email,
    });

    await this.userRepository.create(user);
  }
}
