import { IsEmail, MinLength } from 'class-validator';

export class CreateCustomerDto {
  @IsEmail()
  email: string;

  @MinLength(8)
  password: string;
}
