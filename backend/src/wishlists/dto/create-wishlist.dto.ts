import { Min, IsUrl, IsOptional } from 'class-validator';

export class CreateWishlistDto {
  name: string;

  @IsUrl()
  image: string;

  @Min(1)
  itemsId: number[];

  @IsOptional()
  description: string;
}
