import { IsDecimal } from 'class-validator';

export class CreateOrderDto {
  @IsDecimal()
  price: string;
}
