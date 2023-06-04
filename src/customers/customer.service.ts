import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CustomerEntity } from './customer.entity';
import { Repository } from 'typeorm';
import { Nullable } from '../common/nullable.type';
import { CreateCustomerDto } from './dto/create-customer.dto';
import { HashService } from '../common/hash.service';

@Injectable()
export class CustomerService {
  constructor(
    @InjectRepository(CustomerEntity)
    private customerRepository: Repository<CustomerEntity>,
    private hashService: HashService,
  ) {}

  getById(id: string): Promise<Nullable<CustomerEntity>> {
    return this.customerRepository.findOneBy({ id });
  }

  getByEmail(email: string): Promise<Nullable<CustomerEntity>> {
    return this.customerRepository.findOneBy({ email });
  }

  create(createCustomerDto: CreateCustomerDto): Promise<CustomerEntity> {
    const { password, ...customerData } = createCustomerDto;
    const passwordHash = this.hashService.createHash(password);
    const customerEntity = this.customerRepository.create({
      ...customerData,
      passwordHash,
    });

    return this.customerRepository.save(customerEntity);
  }
}
