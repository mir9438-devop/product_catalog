// src/seeder/seeder.service.ts
import { Injectable, OnApplicationBootstrap } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../users/user.entity';
import { Product } from '../products/product.entity';

@Injectable()
export class SeederService implements OnApplicationBootstrap {
  constructor(
    @InjectRepository(User)
    private readonly userRepo: Repository<User>,
    @InjectRepository(Product)
    private readonly productRepo: Repository<Product>,
  ) { }

  async onApplicationBootstrap() {
    // Seed default User (only if not exists)
    const existingUser = await this.userRepo.findOne({ where: { email: 'demo@kitchen365.com' } });
    if (!existingUser) {
      const user = this.userRepo.create({
        email: 'demo@kitchen365.com',
        passwordHash: '$2b$10$O5iIJPUb99X6.IpTWioQnuT/icSIt.wYxlsr0DMz0UkRHFA/v0JLS', // hash if needed
      });
      await this.userRepo.save(user);
      console.log('✅ Default admin user created');
    }

    // Seed default Product (only if not exists)
    const existingProducts = await this.productRepo.count();
    if (existingProducts === 0) {
      const product = this.productRepo.create([
        {
          name: 'Laptop',
          price: 1200,
          description: 'High performance laptop'
        },
        {
          name: 'Smartphone',
          price: 800,
          description: 'Latest smartphone with AMOLED display'
        },
        {
          name: 'Headphones',
          price: 200,
          description: 'Noise cancelling headphones'
        },
        {
          name: 'Smartwatch',
          price: 150,
          description: 'Waterproof smartwatch with GPS'
        },
      ]);
      await this.productRepo.save(product);
      console.log('✅ Default product created');
    }
  }
}
