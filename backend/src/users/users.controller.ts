import {
  Controller,
  Get,
  Post,
  Patch,
  Param,
  Req,
  UseGuards,
  Body,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { User } from './entities/user.entity';
import { JwtGuard } from 'src/auth/guards/jwt.guard';
import { UpdateUserDto } from './dto/update-user.dto';
import { ServerException } from 'src/exceptions/server.exceptions';
import { ErrorCode } from 'src/exceptions/error-codes';
import { Wish } from 'src/wishes/entities/wish.entity';

@UseGuards(JwtGuard)
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get('me')
  GetMe(@Req() req: Request & { user: User }): User {
    return req.user;
  }

  @Get()
  findAll(): Promise<User[]> {
    return this.usersService.findAll();
  }

  @Patch('me')
  updateMe(
    @Req() req: Request & { user: User },
    @Body() updateUserDto: UpdateUserDto,
  ): Promise<User> {
    return this.usersService.updateMe(req.user.id, updateUserDto);
  }

  @Get('me/wishes')
  getMyWishes(@Req() req: Request & { user: User }): Promise<Wish[]> {
    return this.usersService.getUserWishes(req.user.username);
  }

  @Get(':username')
  async getUser(@Param('username') username: string): Promise<User> {
    const user = await this.usersService.findByUsername(username);
    if (!user) {
      throw new ServerException(ErrorCode.UserNotFound);
    } else {
      return user;
    }
  }

  @Get(':username/wishes')
  async getUserWishes(@Param('username') username: string): Promise<Wish[]> {
    const user = this.getUser(username);
    if (!user) {
      throw new ServerException(ErrorCode.UserNotFound);
    } else {
      return await this.usersService.getUserWishes(username);
    }
  }

  @Post('find')
  async find(@Body('query') query: string): Promise<User[]> {
    const users = await this.usersService.findMany(query);
    if (!users) {
      throw new ServerException(ErrorCode.UserNotFound);
    } else {
      return users;
    }
  }
}
