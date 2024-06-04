import { HashGenerator } from '@/application/cryptography/hash-generator';
import { BadRequestException, Injectable } from '@nestjs/common';
import { User } from 'src/application/entities/user';
import { UserRepository } from 'src/application/repositories/user-repository';

interface CreateUserRequest {
  name: string;
  email: string;
  password?: string;
  role: 'ADMIN' | 'USER';
}

@Injectable()
export class CreateUser {
  constructor(
    private userRepository: UserRepository,
    private hashGenerator: HashGenerator,
  ) {}

  async execute({ name, email, password, role }: CreateUserRequest) {
    const userWithSameEmail = await this.userRepository.findByEmail(email);

    if (userWithSameEmail) {
      throw new BadRequestException(`Usuário com email ${email} já existe`, {
        cause: new Error(`Usuário com email ${email} já existe`),
        description: `Usuário com email ${email} já existe`,
      });
    }

    const hashedPassword = await this.hashGenerator.hash(password);

    const user = User.create({
      name,
      email,
      role,
      password: hashedPassword,
    });

    await this.userRepository.create(user);
  }
}
