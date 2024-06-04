import { Controller, Get, Param } from '@nestjs/common';
import { Role } from '@prisma/client';
import { Auth } from 'src/infra/decorators/auth.decorator';
import { NotificationPresenter } from './presenters/notification.presenter';
import { FetchAllUnreadNotifications } from '@/application/usecases/notifications/fetch-all-unread-notifications';
import { ReadNotification } from '@/application/usecases/notifications/read-notification';
import { ReadAllNotifications } from '@/application/usecases/notifications/read-all-unread-notifications';

@Controller('notifications')
export class NotificationController {
  constructor(
    private fetchAllUnreadNotifications: FetchAllUnreadNotifications,
    private readNotification: ReadNotification,
    private readAllNotifications: ReadAllNotifications,
  ) {}

  @Auth(Role.ADMIN, Role.USER)
  @Get('/:userId')
  async fetchUnreads(@Param('userId') userId: string) {
    const { notifications } = await this.fetchAllUnreadNotifications.execute({
      userId,
    });

    return { notifications: notifications.map(NotificationPresenter.toHTTP) };
  }

  @Auth(Role.ADMIN, Role.USER)
  @Get('/read/:id')
  async readMessage(@Param('id') id: string) {
    await this.readNotification.execute({
      id,
    });

    return;
  }

  @Auth(Role.ADMIN, Role.USER)
  @Get('/readAll/:userId')
  async readAllMessages(@Param('userId') userId: string) {
    await this.readAllNotifications.execute({
      userId,
    });

    return;
  }
}
