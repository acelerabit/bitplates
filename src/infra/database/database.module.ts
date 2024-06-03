import { Module } from '@nestjs/common';
import { PrismaService } from './prisma/prisma.service';
import { UserRepository } from 'src/application/repositories/user-repository';
import { PrismaUsersRepository } from './prisma/repositories/prisma-users-repository';

@Module({
  providers: [
    {
      provide: UserRepository,
      useClass: PrismaUsersRepository,
    },

    PrismaService,
  ],
  exports: [
    {
      provide: UserRepository,
      useClass: PrismaUsersRepository,
    },
    PrismaService,
  ],
})
export class DatabaseModule {}
