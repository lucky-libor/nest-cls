import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { AuthTokenPayload } from './dto/auth-token.payload';
import { Request } from 'express';
import { CustomerService } from '../customers/customer.service';
import { ClsService } from 'nestjs-cls';
import { AuthClsStore } from './auth-cls.store';
import { Reflector } from '@nestjs/core';
import { AUTH_METADATA_KEY } from './auth.decorator';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private jwtService: JwtService,
    private configService: ConfigService,
    private customerService: CustomerService,
    private authClsStore: ClsService<AuthClsStore>,
    private reflector: Reflector,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const isAuth = this.reflector.getAllAndOverride<boolean>(
      AUTH_METADATA_KEY,
      [context.getHandler(), context.getClass()],
    );

    if (!isAuth) {
      return true;
    }

    const token = this.extractTokenFromHeader(request);
    if (!token) {
      throw new UnauthorizedException();
    }

    try {
      const payload: AuthTokenPayload = await this.jwtService.verifyAsync(
        token,
        {
          secret: this.configService.get('AUTH_SECRET'),
        },
      );
      const customer = await this.customerService.getById(payload.id);

      if (!customer) {
        throw new UnauthorizedException();
      }

      this.authClsStore.set('customer', customer);
    } catch {
      throw new UnauthorizedException();
    }

    return true;
  }

  private extractTokenFromHeader(request: Request): string | undefined {
    const [type, token] = request.headers.authorization?.split(' ') ?? [];
    return type === 'Bearer' ? token : undefined;
  }
}
