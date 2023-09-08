import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsEmail } from 'class-validator';

export class EmailDto {
  @IsEmail()
  @IsNotEmpty()
  @ApiProperty()
  email!: string;
}