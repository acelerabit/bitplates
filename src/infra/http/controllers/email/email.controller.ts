import { EMAIL_QUEUE } from '@/common/constants';
import { InjectQueue } from '@nestjs/bull';
import { Controller, Get } from '@nestjs/common';
import { Queue } from 'bull';

@Controller('email')
export class EmailController {
  constructor(@InjectQueue(EMAIL_QUEUE) private sendMailQueue: Queue) {}

  @Get('/send-email')
  async sendMail() {
    await this.sendMailQueue.add('sendMail-job', {
      email: 'gabrielferrsantos201@gmail.com',
      subject: 'teste',
      text: 'HELLO',
    });

    return;
  }
}
