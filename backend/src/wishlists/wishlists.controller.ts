import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Req,
  UseGuards,
} from '@nestjs/common';
import { User } from 'src/users/entities/user.entity';
import { WishlistsService } from './wishlists.service';
import { CreateWishlistDto } from './dto/create-wishlist.dto';
import { UpdateWishlistDto } from './dto/update-wishlist.dto';
import { JwtGuard } from 'src/auth/guards/jwt.guard';
import { ServerException } from 'src/exceptions/server.exceptions';
import { ErrorCode } from 'src/exceptions/error-codes';
import { Wishlist } from './entities/wishlist.entity';

@UseGuards(JwtGuard)
@Controller('wishlistlists')
export class WishlistsController {
  constructor(private readonly wishlistsService: WishlistsService) {}

  @Post()
  create(
    @Body() createWishlistDto: CreateWishlistDto,
    @Req() req: Request & { user: User },
  ): Promise<Wishlist> {
    return this.wishlistsService.create(createWishlistDto, req.user);
  }

  @Get()
  findAll(): Promise<Wishlist[]> {
    return this.wishlistsService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<Wishlist> {
    const wishlist = await this.wishlistsService.findOne(+id);
    if (!wishlist) {
      throw new ServerException(ErrorCode.WishlistNotFound);
    } else return wishlist;
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateWishlistDto: UpdateWishlistDto,
    @Req() req: Request & { user: User },
  ): Promise<Wishlist> {
    const wishlist = await this.findOne(id);
    if (wishlist.owner.id !== req.user.id) {
      throw new ServerException(ErrorCode.Forbidden);
    } else return this.wishlistsService.update(+id, updateWishlistDto);
  }

  @Delete(':id')
  async remove(
    @Param('id') id: string,
    @Req() req: Request & { user: User },
  ): Promise<Wishlist> {
    const wishlist = await this.findOne(id);
    if (wishlist.owner.id !== req.user.id) {
      throw new ServerException(ErrorCode.Forbidden);
    } else return this.wishlistsService.remove(+id);
  }
}
