import {
  IsNotEmpty,
  IsString,
  isNotEmpty,
} from 'class-validator';

export class resetPasswordDto {
  @IsString()
  @IsNotEmpty()
	new_password: string

  @IsString()
  @IsNotEmpty()
  token: string
}