import { IsEmail, MinLength } from 'class-validator';

export class AuthSignUpDto {
  @IsEmail()
  email: string;

  @MinLength(8)
  password: string;
}
