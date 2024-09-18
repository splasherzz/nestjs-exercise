import { IsString, IsArray, IsNotEmpty, IsOptional, MinLength } from 'class-validator';

export class CreateBookDto {
  @IsString()
  @IsNotEmpty({ message: 'Title is required' })
  @MinLength(2)
  title: string;

  @IsArray()
  @IsOptional()
  authors?: number[];

  @IsString()
  @IsOptional()
  genre?: string;
}
