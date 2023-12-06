import { Injectable } from '@nestjs/common';
import { hash, compare } from 'bcrypt';

@Injectable()
export class HashService {
  async hash(password: string): Promise<string> {
    return await hash(password, 10);
  }

  async compare(password: string, hash: string): Promise<boolean> {
    const matched: boolean = await compare(password, hash);
    return matched;
  }
}
