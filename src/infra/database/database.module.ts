import { Module } from '@nestjs/common';
import { PrismaService } from './prisma/prisma.service';
import { UserRepository } from 'src/application/repositories/user-repository';
import { PrismaUsersRepository } from './prisma/repositories/prisma-users-repository';
import { NotificationRepository } from '@/application/repositories/notification-repository';
import { PrismaNotificationsRepository } from './prisma/repositories/prisma-notifications-repository';

@Module({
  providers: [
    {
      provide: UserRepository,
      useClass: PrismaUsersRepository,
    },
    {
      provide: NotificationRepository,
      useClass: PrismaNotificationsRepository,
    },
    PrismaService,
  ],
  exports: [
    {
      provide: UserRepository,
      useClass: PrismaUsersRepository,
    },
    {
      provide: NotificationRepository,
      useClass: PrismaNotificationsRepository,
    },
    PrismaService,
  ],
})
export class DatabaseModule {}
