import { Body, Controller, Get, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthSignUpDto } from './dto/auth-sign-up.dto';
import { CustomerEntity } from '../customers/customer.entity';
import { AuthSignInDto } from './dto/auth-sign-in.dto';
import { AuthTokenDto } from './dto/auth-token.dto';
import { Auth } from './auth.decorator';

@Controller('/auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('/sign-up')
  signUp(@Body() body: AuthSignUpDto): Promise<CustomerEntity> {
    return this.authService.signUp(body);
  }

  @Post('/sign-in')
  signIn(@Body() body: AuthSignInDto): Promise<AuthTokenDto> {
    return this.authService.signIn(body);
  }

  @Get('/me')
  @Auth()
  getMe(): Promise<CustomerEntity> {
    return this.authService.getMe();
  }
}
