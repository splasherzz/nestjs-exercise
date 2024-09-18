import { IsString, IsNotEmpty, IsOptional, MinLength } from 'class-validator';

export class CreateBookDto {
  @IsString()
  @IsNotEmpty({ message: 'Title is required' })
  @MinLength(2)
  title: string;

  @IsString()
  @IsNotEmpty({ message: 'Author\'s first name is required' })
  @MinLength(1)
  authorFirstName: string;

  @IsString()
  @IsNotEmpty({ message: 'Author\'s last name is required' })
  @MinLength(2)
  authorLastName: string;

  @IsString()
  @IsOptional()
  genre?: string;
}
