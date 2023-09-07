import { CommonModule } from '@common/common.module';
import { ConfigModule } from '@nestjs/config';

import { Module } from '@nestjs/common';

import { UsersController } from '@users/users.controller';

import { UsersService } from '@users/users.service';

@Module({
  imports: [ConfigModule, CommonModule],
  controllers: [UsersController],
  providers: [UsersService]
})

export class UsersModule { }
