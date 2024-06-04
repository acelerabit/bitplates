import { Injectable, NestMiddleware } from '@nestjs/common';
import { JwtEncrypter } from '../cryptography/jwt-encrypter';

@Injectable()
export class CurrentUserMiddleware implements NestMiddleware {
  constructor(private jwtEncrypter: JwtEncrypter) {}
  async use(req, res, next) {
    if (req.headers.authorization) {
      const [, token] = req.headers.authorization.split(' ');

      const data = await this.jwtEncrypter.decode(token);

      req.id = data.id;
      req.email = data.email;
    }

    next();
  }
}
