import { IsEmail, IsOptional, IsUrl, Length, Min } from 'class-validator';

export class CreateUserDto {
  @Length(1, 64)
  username: string;

  @IsEmail()
  email: string;

  @Min(2)
  password: string;

  @IsOptional()
  @Length(0, 200)
  about: string;

  @IsOptional()
  @IsUrl()
  avatar: string;
}
