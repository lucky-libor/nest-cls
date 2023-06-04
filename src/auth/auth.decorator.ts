import { applyDecorators, SetMetadata } from '@nestjs/common';
import { ApiBearerAuth } from '@nestjs/swagger';

export const AUTH_METADATA_KEY = Symbol('AUTH');

export function Auth() {
  return applyDecorators(SetMetadata(AUTH_METADATA_KEY, true), ApiBearerAuth());
}
