import { IsNotEmpty } from 'class-validator';

export class CancelOrderDto {
  @IsNotEmpty()
  cancelReason: string;
}
