import { IsString, IsNotEmpty } from 'class-validator';

export class CreateAuthorDto {
    @IsString()
    @IsNotEmpty()
    authorFirstName: string;

    @IsString()
    @IsNotEmpty()
    authorLastName: string;
}
