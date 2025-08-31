import { Entity, PrimaryGeneratedColumn, Column, BeforeInsert } from 'typeorm';

@Entity()
export class Product {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column('float')
  price: number;

  @Column({ nullable: true })
  description?: string;

  @Column({ type: 'bigint', default: () => `EXTRACT(EPOCH FROM now())::bigint` })
  iCreatedAt: number;

  @BeforeInsert()
  setCreatedAt() {
    this.iCreatedAt = Math.floor(Date.now() / 1000); // epoch in milliseconds
  }

}
