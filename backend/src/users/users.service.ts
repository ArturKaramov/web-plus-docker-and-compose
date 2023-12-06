import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import { HashService } from 'src/hash/hash.service';
import { UpdateUserDto } from './dto/update-user.dto';
import { Wish } from 'src/wishes/entities/wish.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly usersRepository: Repository<User>,
    private readonly hashService: HashService,
  ) {}

  async create(createUserDto: CreateUserDto): Promise<User> {
    const hashedPassword = await this.hashService.hash(createUserDto.password);
    createUserDto.password = hashedPassword;
    return await this.usersRepository.save(createUserDto);
  }

  async findByUsernameWithPassword(username: string): Promise<User> {
    const user = await this.usersRepository
      .createQueryBuilder('user')
      .where({ username })
      .addSelect('user.password')
      .getOne();
    return user;
  }

  async findByUsername(username: string): Promise<User> {
    return await this.usersRepository.findOneBy({ username });
  }

  async findOne(id: number): Promise<User> {
    return await this.usersRepository.findOneBy({ id });
  }

  async findAll(): Promise<User[]> {
    return await this.usersRepository.find();
  }

  async updateMe(id: number, updateUserDto: UpdateUserDto): Promise<User> {
    if (updateUserDto.password) {
      const hashed = await this.hashService.hash(updateUserDto.password);
      updateUserDto.password = hashed;
    }
    await this.usersRepository.update(id, updateUserDto);
    return await this.findOne(id);
  }

  async getUserWishes(username: string): Promise<Wish[]> {
    const user = await this.usersRepository.findOne({
      where: { username },
      relations: ['wishes', 'wishes.owner', 'wishes.offers'],
    });
    return user.wishes;
  }

  async findMany(query: string): Promise<User[]> {
    const users = await this.usersRepository.find({
      where: [{ email: query }, { username: query }],
    });
    return users;
  }
}
