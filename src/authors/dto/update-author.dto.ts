import { IsString, IsOptional, MinLength } from 'class-validator';

export class UpdateAuthorDto {
    @IsString()
    @IsOptional()
    @MinLength(1)
    firstName?: string;

    @IsString()
    @IsOptional()
    @MinLength(2)
    lastName?: string;
}
