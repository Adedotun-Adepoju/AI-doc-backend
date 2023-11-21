import {
  IsEmail,
  IsNotEmpty,
  IsString,
} from 'class-validator';

export class createAccountDto {
  @IsString()
  first_name: string

  @IsString()
	last_name: string

  @IsEmail()
  @IsNotEmpty()
	email: string

  @IsNotEmpty()
	password: string
}