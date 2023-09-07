import { ConfigModule } from '@nestjs/config';
import { CommonModule } from '@common/common.module';
import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';

import { SecurityService } from '@security/security.service';
import { SecurityController } from '@security/security.controller';
import { PermissionsGuard } from '@security/guards/permissions.guard';
import { AuthGuard } from '@security/guards/auth.guard';

import { SecurityMiddleware } from '@common/middlewares/security.middleware';

@Module({
  imports: [CommonModule, ConfigModule],
  controllers: [SecurityController],
  providers: [
    SecurityService,
    { provide: APP_GUARD, useClass: AuthGuard },
    { provide: APP_GUARD, useClass: PermissionsGuard }
  ]
})
export class SecurityModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(SecurityMiddleware)
      .forRoutes('/auth/me');
  }
}
