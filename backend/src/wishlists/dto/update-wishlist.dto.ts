import { Min, IsUrl, IsOptional } from 'class-validator';

export class UpdateWishlistDto {
  @IsOptional()
  name: string;

  @IsOptional()
  @IsUrl()
  image: string;

  @IsOptional()
  @Min(1)
  itemsId: number[];

  @IsOptional()
  description: string;
}
