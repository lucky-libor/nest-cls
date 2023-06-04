import { Injectable, UnauthorizedException } from '@nestjs/common';
import { CustomerService } from '../customers/customer.service';
import { AuthSignUpDto } from './dto/auth-sign-up.dto';
import { CustomerEntity } from '../customers/customer.entity';
import { AuthSignInDto } from './dto/auth-sign-in.dto';
import { AuthTokenDto } from './dto/auth-token.dto';
import { HashService } from '../common/hash.service';
import { JwtService } from '@nestjs/jwt';
import { AuthTokenPayload } from './dto/auth-token.payload';
import { ClsService } from 'nestjs-cls';
import { AuthClsStore } from './auth-cls.store';

@Injectable()
export class AuthService {
  constructor(
    private customerService: CustomerService,
    private hashService: HashService,
    private jwtService: JwtService,
    private authClsStore: ClsService<AuthClsStore>,
  ) {}

  signUp(authSignUpDto: AuthSignUpDto): Promise<CustomerEntity> {
    return this.customerService.create(authSignUpDto);
  }

  async signIn(authSignInDto: AuthSignInDto): Promise<AuthTokenDto> {
    const { email, password } = authSignInDto;
    const customer = await this.customerService.getByEmail(email);
    if (!customer) {
      throw new UnauthorizedException();
    }

    if (!this.hashService.checkHash(password, customer.passwordHash)) {
      throw new UnauthorizedException();
    }

    const authTokenPayload: AuthTokenPayload = { id: customer.id };
    const token = await this.jwtService.signAsync(authTokenPayload);

    return { token };
  }

  async getMe(): Promise<CustomerEntity> {
    return this.authClsStore.get('customer');
  }
}
