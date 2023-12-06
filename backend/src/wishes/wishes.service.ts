import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateWishDto } from './dto/create-wish.dto';
import { UpdateWishDto } from './dto/update-wish.dto';
import { Wish } from './entities/wish.entity';
import { User } from 'src/users/entities/user.entity';

@Injectable()
export class WishesService {
  constructor(
    @InjectRepository(Wish)
    private readonly wishesRepository: Repository<Wish>,
  ) {}

  async create(user: User, createWishDto: CreateWishDto): Promise<Wish> {
    return await this.wishesRepository.save({
      ...createWishDto,
      owner: user,
    });
  }

  async getLast(): Promise<Wish[]> {
    return await this.wishesRepository.find({
      order: { createdAt: 'desc' },
      take: 40,
    });
  }

  async getTop(): Promise<Wish[]> {
    return await this.wishesRepository.find({
      order: { copied: 'asc' },
      take: 20,
    });
  }

  async findOne(id: number): Promise<Wish> {
    return await this.wishesRepository.findOne({
      where: { id },
      relations: { owner: true },
    });
  }

  async update(id: number, updateWishDto: UpdateWishDto): Promise<Wish> {
    await this.wishesRepository.update(id, updateWishDto);
    return await this.findOne(id);
  }

  async raise(id: number, amount: { raised: number }): Promise<Wish> {
    await this.wishesRepository.update(id, amount);
    return await this.findOne(id);
  }

  async remove(id: number): Promise<void> {
    await this.wishesRepository.delete(id);
  }

  async copy(id: number, user: User): Promise<Wish> {
    const wish = await this.wishesRepository.findOneBy({ id });
    delete wish.id;
    delete wish.createdAt;
    delete wish.updatedAt;
    delete wish.offers;
    delete wish.raised;
    this.wishesRepository.update(id, { copied: wish.copied++ });
    return await this.create(user, wish);
  }
}
