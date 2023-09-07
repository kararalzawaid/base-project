import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional, IsString, IsStrongPassword } from 'class-validator';

export class CreateUserDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  readonly email!: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  readonly username!: string;

  @IsStrongPassword()
  @IsNotEmpty()
  @ApiProperty()
  readonly password!: string;

  @IsOptional()
  @IsString()
  @ApiProperty()
  readonly firstName?: string;

  @IsOptional()
  @IsString()
  @ApiProperty()
  readonly lastName?: string;
}
