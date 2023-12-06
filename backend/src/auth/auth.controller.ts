import {
  Controller,
  Post,
  Req,
  UseGuards,
  Body,
  HttpCode,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { UsersService } from 'src/users/users.service';
import { LocalGuard } from './guards/local.guard';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from 'src/users/entities/user.entity';
import { ServerException } from 'src/exceptions/server.exceptions';
import { ErrorCode } from 'src/exceptions/error-codes';

@Controller()
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly usersService: UsersService,
  ) {}

  @Post('signup')
  async signup(
    @Body() createUserDto: CreateUserDto,
  ): Promise<{ access_token: string }> {
    const existingUser = await this.usersService.findByUsername(
      createUserDto.username,
    );
    const existingEmail = await this.usersService.findMany(createUserDto.email);
    if (existingUser || existingEmail.length > 0) {
      throw new ServerException(ErrorCode.UserAlreadyExists);
    } else {
      const user = await this.usersService.create(createUserDto);
      return this.authService.auth(user);
    }
  }

  @UseGuards(LocalGuard)
  @HttpCode(200)
  @Post('signin')
  signin(@Req() req: Request & { user: User }): { access_token: string } {
    return this.authService.auth(req.user);
  }
}
