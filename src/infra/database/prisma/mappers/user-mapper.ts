import { Prisma, User as PrismaUser } from '@prisma/client';
import { User } from 'src/application/entities/user';

export class PrismaUserMapper {
  static toDomain(user: PrismaUser) {
    return User.create(
      {
        email: user.email,
        name: user.name,
        createdAt: user.createdAt,
      },
      user.id,
    );
  }

  static toPrisma(user: User): Prisma.UserUncheckedCreateInput {
    return {
      email: user.email,
      name: user.name,
      createdAt: user.createdAt,
      id: user.id,
    };
  }
}
