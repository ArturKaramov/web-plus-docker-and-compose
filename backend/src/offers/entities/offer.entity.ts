import { Entity, Column, ManyToOne } from 'typeorm';
import { IsNotEmpty, IsNumber } from 'class-validator';
import { User } from 'src/users/entities/user.entity';
import { Wish } from 'src/wishes/entities/wish.entity';
import { BaseEntity } from 'src/base-entity/base.entity';

@Entity()
export class Offer extends BaseEntity {
  @ManyToOne(() => Wish, (wish) => wish.offers)
  item: Wish;

  @Column({ type: 'float' })
  @IsNumber()
  @IsNotEmpty()
  amount: number;

  @Column({ default: false })
  hidden: boolean;

  @ManyToOne(() => User)
  user: User;
}
