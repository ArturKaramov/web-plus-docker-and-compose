import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { UsersService } from 'src/users/users.service';
import { ServerException } from 'src/exceptions/server.exceptions';
import { ErrorCode } from 'src/exceptions/error-codes';
import { User } from 'src/users/entities/user.entity';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    private readonly configService: ConfigService,
    private readonly usersService: UsersService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: configService.get<string>('jwt_secret'),
      signOptions: { expiresIn: '1d' },
    });
  }

  async validate(jwtPayload: { sub: number }): Promise<User> {
    const user = await this.usersService.findOne(jwtPayload.sub);

    if (!user) {
      throw new ServerException(ErrorCode.UserNotFound);
    } else return user;
  }
}
