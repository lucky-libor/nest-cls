import { ClsStore } from 'nestjs-cls';
import { CustomerEntity } from '../customers/customer.entity';

export interface AuthClsStore extends ClsStore {
  customer: CustomerEntity;
}
