import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductsModule } from './products/products.module';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { Product } from './products/product.entity';
import { User } from './users/user.entity';
import { SeederModule } from './seeder/seeder.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DATABASE_HOST || 'localhost',
      port: Number(process.env.DATABASE_PORT) || 5434,
      username: process.env.DATABASE_USER || 'nestuser',
      password: process.env.DATABASE_PASS || 'nestpass',
      database: process.env.DATABASE_NAME || 'productdb',
      entities: [Product, User], 
      synchronize: true, 
    }),
    ProductsModule,
    UsersModule,
    AuthModule,
    SeederModule
  ],
})
export class AppModule {}
