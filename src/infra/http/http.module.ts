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
import { EmailModule } from '../email/email.module';
import { EmailController } from './controllers/email/email.controller';
import { ReadAllNotifications } from '@/application/usecases/notifications/read-all-unread-notifications';
import { ReadNotification } from '@/application/usecases/notifications/read-notification';
import { FetchAllUnreadNotifications } from '@/application/usecases/notifications/fetch-all-unread-notifications';
import { NotificationController } from './controllers/notifications/notification.controller';
import { WebSocketModule } from '../websocket/websocket.module';
import { WebsocketsGateway } from '../websocket/websocket.service';

@Module({
  imports: [DatabaseModule, CryptographyModule, EmailModule, WebSocketModule],
  controllers: [
    UsersController,
    AuthController,
    EmailController,
    NotificationController,
  ],
  providers: [
    CreateUser,
    LoginUser,
    LoginWithGoogle,
    JwtService,
    UpdateUser,
    ReadAllNotifications,
    ReadNotification,
    FetchAllUnreadNotifications,
    WebsocketsGateway,
  ],
})
export class HttpModule {}
