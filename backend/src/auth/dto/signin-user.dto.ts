import { Length, Min } from 'class-validator';

export class SigninUserDto {
  @Length(1, 64)
  username: string;

  @Min(2)
  password: string;
}
