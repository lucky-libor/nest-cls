import { BaseEntity } from '../common/base.entity';
import { Column, Entity } from 'typeorm';
import { Nullable } from '../common/nullable.type';

@Entity('orders')
export class OrderEntity extends BaseEntity {
  @Column({ type: 'uuid' })
  customerId: string;

  @Column({ type: 'money' })
  price: string;

  @Column({ type: 'varchar' })
  status: string;

  @Column({ type: 'varchar', nullable: true })
  cancelReason: Nullable<string>;
}
