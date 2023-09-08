import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty, IsEmail } from 'class-validator';

export class SimpleLoginDto {
  @IsEmail()
  @IsNotEmpty()
  @ApiProperty()
  readonly email!: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  readonly password!: string;
}
