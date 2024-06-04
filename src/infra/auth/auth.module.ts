import { Module } from '@nestjs/common';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { JwtStrategyUser } from './jwt.strategy';
import { jwtSecret } from '@/application/common/constants';

@Module({
  imports: [
    JwtModule.register({
      secret: jwtSecret,

      signOptions: {
        expiresIn: '2 days',
      },
    }),
    PassportModule,
  ],

  providers: [JwtStrategyUser, JwtService],
})
export class AuthModule {}
