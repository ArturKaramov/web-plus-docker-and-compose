import { IsEmail, IsOptional, IsUrl, Length, Min } from 'class-validator';

export class UpdateUserDto {
  @IsOptional()
  @Length(1, 64)
  username: string;

  @IsOptional()
  @IsEmail()
  email: string;

  @IsOptional()
  @Min(2)
  password: string;

  @IsOptional()
  @Length(0, 200)
  about: string;

  @IsOptional()
  @IsUrl()
  avatar: string;
}
