import { IsString, IsNotEmpty, IsOptional, MinLength } from 'class-validator';

export class UpdateBookDto {
  @IsString()
  @IsOptional()
  @MinLength(2)
  title?: string;

  @IsString()
  @IsOptional()
  @MinLength(1)
  authorFirstName?: string;

  @IsString()
  @IsOptional()
  @MinLength(2)
  authorLastName?: string;

  @IsString()
  @IsOptional()
  genre?: string;
}
