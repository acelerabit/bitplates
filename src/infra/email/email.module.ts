import { BullModule } from '@nestjs/bull';
import { Module } from '@nestjs/common';
import 'dotenv/config';
import { EMAIL_QUEUE } from '@/common/constants';
import { SendMailConsumerSendGrid } from '../jobs/send-mail-sendgrid.consumer';
import { SendGridClient } from './sendgrid/send-grid.client';

const url = new URL(process.env.REDIS_URL);

@Module({
  imports: [
    BullModule.forRoot({
      redis: {
        host: url.hostname,
        port: Number(url.port),
        password: url.password,
      },
    }),
    BullModule.registerQueue({
      name: EMAIL_QUEUE,
    }),
  ],
  providers: [SendMailConsumerSendGrid, SendGridClient],
  exports: [BullModule],
})
export class EmailModule {}
