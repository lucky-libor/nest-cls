import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Put,
  Query,
  UseGuards,
} from '@nestjs/common';
import { OrderService } from './order.service';
import { PageOptionsDto } from '../common/page-options.dto';
import { OrderEntity } from './order.entity';
import { CreateOrderDto } from './dto/create-order.dto';
import { CancelOrderDto } from './dto/cancel-order.dto';
import { Nullable } from '../common/nullable.type';
import { Auth } from '../auth/auth.decorator';

@Controller('/orders')
@Auth()
export class OrderController {
  constructor(private orderService: OrderService) {}

  @Get()
  getList(@Query() args: PageOptionsDto): Promise<OrderEntity[]> {
    return this.orderService.getList(args);
  }

  @Get('/:id')
  getById(@Param('id') id: string): Promise<Nullable<OrderEntity>> {
    return this.orderService.getById(id);
  }

  @Post()
  create(@Body() body: CreateOrderDto): Promise<OrderEntity> {
    return this.orderService.create(body);
  }

  @Put('/:id/cancel')
  cancel(
    @Param('id') id: string,
    @Body() body: CancelOrderDto,
  ): Promise<Nullable<OrderEntity>> {
    return this.orderService.cancel(id, body);
  }
}
