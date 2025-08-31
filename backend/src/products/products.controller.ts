import { Controller, Get, Post, Delete, Body, Param, Query, UseGuards } from '@nestjs/common';
import { ProductsService } from './products.service';
import { Product } from './product.entity';
import { DeleteResult } from 'typeorm';
import { IsNotEmpty, IsPositive, IsOptional, IsString } from 'class-validator';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

class CreateProductDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsPositive()
  price: number;

  @IsOptional()
  @IsString()
  description?: string;
}

@Controller('products')
export class ProductsController {
  constructor(private readonly service: ProductsService) {}

  @Get()
  getAll(@Query('search') search?: string): Promise<Product[]> {
    return this.service.findAll(search);
  }

  @UseGuards(JwtAuthGuard)
  @Post()
  create(@Body() body: CreateProductDto): Promise<Product> {
    return this.service.create(body);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  remove(@Param('id') id: string): Promise<DeleteResult> {
    return this.service.remove(id);
 }
}
