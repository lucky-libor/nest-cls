import { Column, Entity } from 'typeorm';
import { BaseEntity } from '../common/base.entity';
import { Exclude } from 'class-transformer';

@Entity('customers')
export class CustomerEntity extends BaseEntity {
  @Column({ type: 'varchar', unique: true })
  email: string;

  @Column({ type: 'varchar' })
  @Exclude()
  passwordHash: string;
}
