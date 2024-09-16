import { IsString, IsNotEmpty, IsOptional, MinLength } from 'class-validator';

export class CreateBookDto {
  @IsString()
  @IsNotEmpty()
  @MinLength(2)
  title: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(1)
  authorFirstName: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(2)
  authorLastName: string;

  @IsString()
  @IsOptional()
  genre?: string;
}
