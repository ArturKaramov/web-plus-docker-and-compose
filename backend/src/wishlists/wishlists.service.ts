import { Injectable } from '@nestjs/common';
import { CreateWishlistDto } from './dto/create-wishlist.dto';
import { UpdateWishlistDto } from './dto/update-wishlist.dto';
import { Wishlist } from './entities/wishlist.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from 'src/users/entities/user.entity';
import { WishesService } from 'src/wishes/wishes.service';
import { Wish } from 'src/wishes/entities/wish.entity';

@Injectable()
export class WishlistsService {
  constructor(
    @InjectRepository(Wishlist)
    private readonly wishlistRepository: Repository<Wishlist>,
    private readonly wishesService: WishesService,
  ) {}

  async create(
    createWishlistDto: CreateWishlistDto,
    user: User,
  ): Promise<Wishlist> {
    const { name, image, itemsId } = createWishlistDto;
    const items: Wish[] = await Promise.all(
      itemsId.map(async (item): Promise<Wish> => {
        return await this.wishesService.findOne(item);
      }),
    );

    return await this.wishlistRepository.save({
      name,
      image,
      items,
      owner: user,
    });
  }

  async findAll(): Promise<Wishlist[]> {
    return await this.wishlistRepository.find({
      relations: { owner: true, items: true },
    });
  }

  async findOne(id: number): Promise<Wishlist> {
    return await this.wishlistRepository.findOne({
      where: { id },
      relations: { owner: true, items: true },
    });
  }

  async update(
    id: number,
    updateWishlistDto: UpdateWishlistDto,
  ): Promise<Wishlist> {
    const { itemsId, ...rest } = updateWishlistDto;
    if (itemsId) {
      const items: Wish[] = await Promise.all(
        itemsId.map(async (item): Promise<Wish> => {
          return await this.wishesService.findOne(item);
        }),
      );
      await this.wishlistRepository.update(id, { ...rest, items: items });
    } else {
      await this.wishlistRepository.update(id, rest);
    }
    return await this.findOne(id);
  }

  async remove(id: number): Promise<Wishlist> {
    return await this.wishlistRepository.remove(await this.findOne(id));
  }
}
