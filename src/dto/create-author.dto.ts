import { IsString, IsArray, IsNotEmpty, IsOptional } from 'class-validator';

export class CreateAuthorDto {
    @IsString()
    @IsNotEmpty()
    name: string;  
  
    @IsArray()
    @IsOptional()
    books?: number[]; 
  }
