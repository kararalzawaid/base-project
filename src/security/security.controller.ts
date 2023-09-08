import { ApiOperation, ApiTags } from '@nestjs/swagger';
import {
  Controller,
  Body,
  Post,
  Get,
  Session,
  Logger,
  BadRequestException,
  UseInterceptors,
  HttpCode,
  HttpStatus,
  Query
} from '@nestjs/common';

import { SecurityService } from '@security/security.service';

import { MeDto } from '@security/dto/me.dto';
import { EmailDto } from '@security/dto/email.dto';
import { LoginInputDto } from '@security/dto/login.dto';
import { ResetPasswordDto } from '@security/dto/reset-password.dto';

import { Public } from '@security/decorators/public.decorator';

import { SESSION_EXPIRATION_SETTINGS } from '@common/constants/security.constants';

import { Login } from '@security/types/login.types';

import { HttpErrorHandlerInterceptor } from '@common/interceptors/http-error-handler';

import { UserService } from '@common/services/external/user.service';

@ApiTags('Security')
@Controller()
export class SecurityController {
  private readonly logger: Logger = new Logger(SecurityController.name);

  constructor(
    private readonly securityService: SecurityService,
    private readonly userService: UserService
  ) { }

  @Post('login')
  @Public()
  @UseInterceptors(HttpErrorHandlerInterceptor)
  @ApiOperation({ summary: 'Authenticate user' })
  async login(@Session() session: Record<string, any>, @Body() loginInputDto: LoginInputDto): Promise<Login> {
    try {
      const loginDetails = await this.securityService.login(loginInputDto);

      session.cookie.maxAge = !loginInputDto.keepMe
        ? SESSION_EXPIRATION_SETTINGS.MAIN
        : SESSION_EXPIRATION_SETTINGS.EXTENDED;

      session.user = loginDetails;
      session.origin = loginInputDto.sso;

      return { sso: loginInputDto.sso };
    } catch (err) {
      throw new BadRequestException('The email address or password is incorrect.', err);
    }
  }

  @Get('logout')
  @ApiOperation({ summary: 'Log out user' })
  async logout(@Session() session: Record<string, any>): Promise<void> {
    session.destroy(() => {
      this.logger.log('Session destroyed.');
    });
  }

  @Get('auth/me')
  @Public()
  @ApiOperation({ summary: 'Check user session' })
  async auth(@Session() session: Record<string, any>): Promise<MeDto> {
    const user = session.user;

    const me: MeDto = {
      id: user.id,
      firstName: user.firstName,
      lastName: user.lastName,
      username: user.username,
      email: user.email,
      permissions: user.permissions
    };

    if (session.origin) {
      return { ...me, sso: session.origin };
    }

    return me;
  }

  @Post('forgot-password')
  @Public()
  @HttpCode(HttpStatus.OK)
  @UseInterceptors(HttpErrorHandlerInterceptor)
  @ApiOperation({ summary: 'Return password recover HASH' })
  async forgotPassword(@Body() emailDto: EmailDto): Promise<void> {
    return this.securityService.forgotPassword(emailDto);
  }

  @Get('reset-password/verify')
  @Public()
  @HttpCode(HttpStatus.OK)
  @UseInterceptors(HttpErrorHandlerInterceptor)
  @ApiOperation({ summary: 'Checks recover password token' })
  async resetPasswordVerify(@Query('token') token: string): Promise<void> {
    await this.securityService.resetPasswordVerify(token);
  }

  @Post('reset-password')
  @Public()
  @HttpCode(HttpStatus.OK)
  @UseInterceptors(HttpErrorHandlerInterceptor)
  @ApiOperation({ summary: 'Resets user password' })
  async resetPassword(@Query('token') token: string, @Query('type') type: string, @Body() resetPasswordDto: ResetPasswordDto): Promise<void> {
    try {
      const userId = await this.userService.resetPasswordVerify(token);
      const user = await this.userService.findOne(userId.id);

      this.securityService.resetPassword(token, resetPasswordDto);
    } catch (error) {
      throw new BadRequestException();
    }

  }
}
