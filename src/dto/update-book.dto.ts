import { IsString, IsArray, IsOptional, MinLength } from 'class-validator';

export class UpdateBookDto {
  @IsString()
  @IsOptional()
  @MinLength(2)
  title?: string;

  @IsArray()
  @IsOptional()
  authors?: number[];

  @IsString()
  @IsOptional()
  genre?: string;
}
