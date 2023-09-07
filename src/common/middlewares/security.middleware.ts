import { Injectable, NestMiddleware, UnauthorizedException } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

import { SSOService } from '@common/services/external/sso.service';

@Injectable()
export class SecurityMiddleware implements NestMiddleware {
  constructor(private ssoService: SSOService) { }

  async use(req: Request, res: Response, next: NextFunction): Promise<void> {
    const { session }: any = req;

    if (undefined === session.user || undefined !== session.user.twoFA) {
      throw new UnauthorizedException('You are not authorized to access this resource');
    }

    const { user } = session;
    const response = await this.ssoService.verifyToken(user.token);

    if (response.valid) {
      next();

      return;
    }

    const details = await this.ssoService.refreshToken(user.refreshToken, session);

    session.user = {
      ...session.user,
      token: details.token,
      refreshToken: details.refreshToken
    };

    next();
  }
}
