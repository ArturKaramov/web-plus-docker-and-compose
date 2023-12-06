import { Entity, Column, ManyToOne, ManyToMany, JoinTable } from 'typeorm';
import { BaseEntity } from 'src/base-entity/base.entity';
import { IsNotEmpty, IsNumber, IsUrl, Length, Min } from 'class-validator';
import { User } from 'src/users/entities/user.entity';

@Entity()
export class Wish extends BaseEntity {
  @Column()
  @Length(1, 250)
  name: string;

  @Column()
  @IsUrl()
  link: string;

  @Column()
  image: string;

  @Min(1)
  @IsNotEmpty()
  @Column({ type: 'float', scale: 2 })
  @IsNumber()
  price: number;

  @Column({ type: 'float', scale: 2, default: 0 })
  @IsNumber()
  raised: number;

  @Column({ default: 0 })
  copied: number;

  @Column()
  @Length(1, 1024)
  description: string;

  @ManyToOne(() => User, (user) => user.wishes)
  owner: User;

  @ManyToMany(() => User, (user) => user.offers)
  @JoinTable()
  offers: User[];
}
