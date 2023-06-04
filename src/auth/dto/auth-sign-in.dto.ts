import { IsEmail, MinLength } from 'class-validator';

export class AuthSignInDto {
  @IsEmail()
  email: string;

  @MinLength(8)
  password: string;
}
