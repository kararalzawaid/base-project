import { IsArray, IsOptional, IsString, MinLength } from 'class-validator';

export class FilterDto {
  @MinLength(3)
  @IsString()
  @IsOptional()
  search?: string;

  @IsOptional()
  columns?: Array<string>;
  page?: string;

  @IsOptional()
  limit?: string;

  @IsString()
  @IsOptional()
  sort?: string;

  @IsString()
  @IsOptional()
  sortOrder?: string;

  @IsOptional()
  @IsArray()
  permissionsIds?: number[];
}