import { Injectable } from '@nestjs/common';
import { CreateOfferDto } from './dto/create-offer.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Offer } from './entities/offer.entity';
import { Repository } from 'typeorm';
import { User } from 'src/users/entities/user.entity';
import { WishesService } from 'src/wishes/wishes.service';
import { ServerException } from 'src/exceptions/server.exceptions';
import { ErrorCode } from 'src/exceptions/error-codes';

@Injectable()
export class OffersService {
  constructor(
    @InjectRepository(Offer)
    private readonly offersRepository: Repository<Offer>,
    private readonly wishesService: WishesService,
  ) {}

  async create(user: User, createOfferDto: CreateOfferDto): Promise<Offer> {
    const { itemId, ...rest } = createOfferDto;
    const item = await this.wishesService.findOne(itemId);
    if (user.id === item.owner.id) {
      throw new ServerException(ErrorCode.UserOwnWish);
    } else if (item.price - item.raised < createOfferDto.amount) {
      throw new ServerException(ErrorCode.TooMuchMoney);
    } else {
      item.raised += +createOfferDto.amount.toFixed(2);
      await this.wishesService.raise(itemId, { raised: item.raised });
      return await this.offersRepository.save({ ...rest, user, item });
    }
  }

  async findAll(): Promise<Offer[]> {
    return await this.offersRepository.find({
      relations: { user: true, item: true },
    });
  }

  async findOne(id: number): Promise<Offer> {
    return await this.offersRepository.findOne({
      where: { id },
      relations: { user: true, item: true },
    });
  }
}
