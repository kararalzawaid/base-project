import { Injectable } from '@nestjs/common';

import { EmailDto } from '@security/dto/email.dto';
import { LoginInputDto } from '@security/dto/login.dto';

import { Login } from '@security/types/login.types';

import { SSOService } from '@common/services/external/sso.service';
import { UserService } from '@common/services/external/user.service';

import { ResetPasswordDto } from '@security/dto/reset-password.dto';

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
      fullName: userDetails.fullName,
      email: userDetails.email,
      phone: userDetails.phone
    };
  }

  async forgotPassword(emailDto: EmailDto): Promise<void> {
    const recoveryHash = await this.userService.getRecoveryHash(emailDto);

    // const email = new ForgetPassword(
    //   emailDto.email,
    //   {
    //     link: `${this.configService.get<string>('SSO_APP_FRONT_URL')}/reset-password?token=${recoveryHash.token}&type=1`,
    //     username: emailDto.email
    //   }
    // );

    // await this.emailService.send(email);
    return recoveryHash;
  }

  async resetPasswordVerify(token: string): Promise<void> {
    await this.userService.resetPasswordVerify(token);
  }

  async resetPassword(token: string, resetPasswordDto: ResetPasswordDto): Promise<void> {
    await this.userService.resetPassword(token, resetPasswordDto);
  }

}
