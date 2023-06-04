import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { OrderEntity } from './order.entity';
import { Repository } from 'typeorm';
import { CreateOrderDto } from './dto/create-order.dto';
import { CancelOrderDto } from './dto/cancel-order.dto';
import { PageOptionsDto } from '../common/page-options.dto';
import { Nullable } from '../common/nullable.type';
import { ClsService } from 'nestjs-cls';
import { AuthClsStore } from '../auth/auth-cls.store';

@Injectable()
export class OrderService {
  constructor(
    @InjectRepository(OrderEntity)
    private orderRepository: Repository<OrderEntity>,
    private authClsStore: ClsService<AuthClsStore>,
  ) {}

  getList(pageOptions: PageOptionsDto): Promise<OrderEntity[]> {
    return this.orderRepository.find({
      where: { customerId: this.authClsStore.get('customer.id') },
      take: pageOptions.limit,
      skip: pageOptions.skip,
    });
  }

  getById(id: string): Promise<Nullable<OrderEntity>> {
    return this.orderRepository.findOneBy({
      id,
      customerId: this.authClsStore.get('customer.id'),
    });
  }

  create(createOrderDto: CreateOrderDto): Promise<OrderEntity> {
    const entity = this.orderRepository.create({
      ...createOrderDto,
      customerId: this.authClsStore.get('customer.id'),
      status: 'new',
    });

    return this.orderRepository.save(entity);
  }

  async cancel(
    id: string,
    cancelOrderDto: CancelOrderDto,
  ): Promise<Nullable<OrderEntity>> {
    await this.orderRepository.update(
      { id, customerId: this.authClsStore.get('customer.id') },
      { status: 'cancelled', ...cancelOrderDto },
    );

    return this.getById(id);
  }
}
