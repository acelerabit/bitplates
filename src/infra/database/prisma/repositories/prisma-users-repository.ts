import { User } from 'src/application/entities/user';
import { UserRepository } from 'src/application/repositories/user-repository';
import { PrismaService } from '../prisma.service';
import { Injectable } from '@nestjs/common';
import { PrismaUserMapper } from '../mappers/user-mapper';

@Injectable()
export class PrismaUsersRepository implements UserRepository {
  constructor(private prismaService: PrismaService) {}

  async create(user: User): Promise<void> {
    const userPrisma = PrismaUserMapper.toPrisma(user);

    await this.prismaService.user.create({
      data: userPrisma,
    });
  }

  async findById(id: string): Promise<User> {
    const user = await this.prismaService.user.findUnique({
      where: {
        id,
      },
    });

    return PrismaUserMapper.toDomain(user);
  }

  async findAll(): Promise<User[]> {
    const users = await this.prismaService.user.findMany();

    return users.map(PrismaUserMapper.toDomain);
  }

  async findByEmail(email: string): Promise<User> {
    const raw = await this.prismaService.user.findUnique({
      where: {
        email,
      },
    });

    if (!raw) {
      return null;
    }

    return PrismaUserMapper.toDomain(raw);
  }

  async update(user: User): Promise<void> {
    const prismaUser = PrismaUserMapper.toPrisma(user);

    await this.prismaService.user.update({
      where: {
        id: user.id,
      },
      data: prismaUser,
    });
  }
}
