import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Req,
  UseGuards,
} from '@nestjs/common';
import { OffersService } from './offers.service';
import { CreateOfferDto } from './dto/create-offer.dto';
import { User } from 'src/users/entities/user.entity';
import { JwtGuard } from 'src/auth/guards/jwt.guard';
import { ServerException } from 'src/exceptions/server.exceptions';
import { ErrorCode } from 'src/exceptions/error-codes';
import { Offer } from './entities/offer.entity';

@UseGuards(JwtGuard)
@Controller('offers')
export class OffersController {
  constructor(private readonly offersService: OffersService) {}

  @Post()
  create(
    @Req() req: Request & { user: User },
    @Body() createOfferDto: CreateOfferDto,
  ): Promise<Offer> {
    return this.offersService.create(req.user, createOfferDto);
  }

  @Get()
  findAll(): Promise<Offer[]> {
    return this.offersService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<Offer> {
    const offer = await this.offersService.findOne(+id);
    if (!offer) {
      throw new ServerException(ErrorCode.OfferNotFound);
    } else return offer;
  }
}
