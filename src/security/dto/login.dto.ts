import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty, IsEmail, IsBoolean } from 'class-validator';

export class LoginInputDto {
  @IsEmail()
  @IsNotEmpty()
  @ApiProperty()
  readonly email!: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  readonly password!: string;

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
