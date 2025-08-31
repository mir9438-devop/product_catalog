import { Injectable, ConflictException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { User } from './user.entity';

@Injectable()
export class UsersService {
  constructor(@InjectRepository(User) private repo: Repository<User>) {}

  async findByUsername(email: string) {
    return this.repo.findOne({ where: { email } });
  }

  async create(email: string, password: string) {
    const exists = await this.findByUsername(email);
    if (exists) throw new ConflictException('Username already taken');
    const passwordHash = await bcrypt.hash(password, 10);
    const user = this.repo.create({ email, passwordHash });
    return this.repo.save(user);
  }

  async verify(email: string, password: string) {
    const user = await this.findByUsername(email);
    if (!user) return null;
    const ok = await bcrypt.compare(password, user.passwordHash);
    return ok ? user : null;
  }
}
