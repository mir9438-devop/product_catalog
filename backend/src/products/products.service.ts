import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ILike, Repository, DeleteResult } from 'typeorm';
import { Product } from './product.entity';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Product) 
    private readonly productRepository: Repository<Product>,
  ) {}

  findAll(search?: string) {
    const qb = this.productRepository.createQueryBuilder('product');
    if (search) {
      qb.where('product.name ILIKE :search OR product.description ILIKE :search', {
        search: `%${search}%`,
      });
    }
    qb.orderBy('product.iCreatedAt', 'DESC');

    return qb.getMany();
  }

  create(productData: Partial<Product>) {
    const product = this.productRepository.create(productData);
    return this.productRepository.save(product);
  }

  async remove(id: string): Promise<DeleteResult> {
    return this.productRepository.delete(id);
  }
}
