import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';

import { ConfigModule } from '@nestjs/config';

import { SSOService } from '@common/services/external/sso.service';
import { UserService } from '@common/services/external/user.service';

@Module({
  imports: [HttpModule, ConfigModule],
  providers: [UserService, SSOService],
  exports: [UserService, SSOService]
})

export class CommonModule { }
