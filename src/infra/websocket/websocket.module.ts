import { Module } from '@nestjs/common';
import { WebsocketsGateway } from './websocket.service';
import { DatabaseModule } from '../database/database.module';

@Module({
  imports: [DatabaseModule],
  providers: [WebsocketsGateway],
})
export class WebSocketModule {}
