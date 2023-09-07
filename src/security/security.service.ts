import { Injectable } from '@nestjs/common';

import { LoginInputDto } from '@security/dto/login.dto';

import { Login } from '@security/types/login.types';

import { SSOService } from '@common/services/external/sso.service';
import { UserService } from '@common/services/external/user.service';

@Injectable()
export class SecurityService {
  constructor(
    private readonly ssoService: SSOService,
    private readonly userService: UserService
  ) { }

  async login(loginDto: LoginInputDto): Promise<Login> {
    const loginDetails = await this.ssoService.login(loginDto);

    const userDetails = await this.userService.findOne(loginDetails.id);

    return {
      ...loginDetails,
      firstName: userDetails.firstName,
      lastName: userDetails.lastName,
      username: userDetails.username,
      email: userDetails.email
    };
  }
}
