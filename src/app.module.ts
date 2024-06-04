import { MiddlewareConsumer, Module } from '@nestjs/common';
import { HttpModule } from './infra/http/http.module';
import { DatabaseModule } from './infra/database/database.module';
import { CurrentUserMiddleware } from './infra/middlewares/middleware';
import { JwtEncrypter } from './infra/cryptography/jwt-encrypter';
import { JwtService } from '@nestjs/jwt';
import { CryptographyModule } from './infra/cryptography/cryptography.module';
import { AuthModule } from './infra/auth/auth.module';

@Module({
  imports: [HttpModule, DatabaseModule, CryptographyModule, AuthModule],
  controllers: [],
  providers: [JwtEncrypter, JwtService],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(CurrentUserMiddleware).forRoutes('*');
  }
}
