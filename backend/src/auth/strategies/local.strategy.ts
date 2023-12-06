import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';
import { AuthService } from '../auth.service';
import { ServerException } from 'src/exceptions/server.exceptions';
import { ErrorCode } from 'src/exceptions/error-codes';
import { User } from 'src/users/entities/user.entity';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly authService: AuthService) {
    super();
  }

  async validate(username: string, password: string): Promise<User> {
    const user = await this.authService.validateUser(username, password);

    if (user === null) {
      throw new ServerException(ErrorCode.LoginOrPasswordIncorrect);
    } else {
      return user;
    }
  }
}
