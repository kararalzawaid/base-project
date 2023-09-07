import { Module } from '@nestjs/common';

import { UsersModule } from '@users/users.module';

import { SecurityModule } from '@security/security.module';

@Module({
  imports: [
    UsersModule,
    SecurityModule
  ],
  controllers: [],
  providers: []
})
export class AppModule { }
