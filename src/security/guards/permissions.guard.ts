import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';

import { PERMISSIONS_KEY } from '@security/decorators/permissions.decorator';

@Injectable()
export class PermissionsGuard implements CanActivate {
  constructor(private reflector: Reflector) { }

  canActivate(context: ExecutionContext): boolean {
    const requiredPermissions = this.reflector.getAllAndOverride<string[]>(PERMISSIONS_KEY, [
      context.getHandler(),
      context.getClass()
    ]);

    if (!requiredPermissions) {
      return true;
    }

    const { session } = context.switchToHttp().getRequest();
    const { user } = session;

    if (!user || !user.permissions || user.permissions.length === 0) {
      return false;
    }

    return requiredPermissions.every(permission => user.permissions?.includes(permission));
  }
}
