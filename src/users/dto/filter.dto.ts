import { PartialType } from '@nestjs/swagger';
import { IsArray, IsOptional, IsString } from 'class-validator';

import { FilterDto } from '@common/dto/filter.dto';

export class FilterUsersDto extends PartialType(FilterDto) {
  @IsOptional()
  @IsArray()
  users?: string[];

  @IsString()
  @IsOptional()
  sort?: string;

  @IsString()
  @IsOptional()
  sortOrder?: string;
}
