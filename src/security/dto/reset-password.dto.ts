import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class ResetPasswordDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  readonly password!: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  readonly passwordConfirmation!: string;
}
