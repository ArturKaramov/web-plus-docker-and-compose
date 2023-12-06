import { Injectable } from '@nestjs/common';
import { User } from 'src/users/entities/user.entity';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from 'src/users/users.service';
import { HashService } from 'src/hash/hash.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
    private readonly hashService: HashService,
  ) {}

  auth(user: User): { access_token: string } {
    const payload = { sub: user.id };

    return { access_token: this.jwtService.sign(payload) };
  }

  async validateUser(username: string, password: string): Promise<User | null> {
    const user = await this.usersService.findByUsernameWithPassword(username);

    if (!user) {
      return null;
    } else {
      const matched = await this.hashService.compare(password, user.password);

      if (matched) {
        delete user.password;
        return user;
      } else {
        return null;
      }
    }
  }
}
