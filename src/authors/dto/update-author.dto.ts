import { IsString, IsOptional, IsArray } from 'class-validator';

export class UpdateAuthorDto {
  @IsString()
  @IsOptional()
  name?: string;  

  @IsArray()
  @IsOptional()
  books?: number[];  
}
