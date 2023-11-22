import {
  IsEmail,
  IsNotEmpty,
} from 'class-validator';

export class requestPasswordResetDto {
  @IsEmail()
  @IsNotEmpty()
	email: string
}