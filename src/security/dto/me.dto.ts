import { OmitType } from '@nestjs/swagger';

import { SSOLoginOutput } from '@common/types/login.type';

export class MeDto extends OmitType(SSOLoginOutput, ['token', 'refreshToken', 'twoFA', 'twoFACount'] as const) {
  permissions: [];
  sso?: string;
}
