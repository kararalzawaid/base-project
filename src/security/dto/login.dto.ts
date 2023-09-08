import { ApiProperty, PartialType } from '@nestjs/swagger';
import { IsString, IsNotEmpty, IsEmail, IsBoolean } from 'class-validator';
import { SimpleLoginDto } from './simple-login.dto';

export class LoginInputDto extends PartialType(SimpleLoginDto) {
  @IsBoolean()
  @IsNotEmpty()
  @ApiProperty()
  readonly twoFACode!: boolean;

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  readonly sso!: string;

  @IsNotEmpty()
  @ApiProperty()
  readonly keepMe!: boolean;
}
