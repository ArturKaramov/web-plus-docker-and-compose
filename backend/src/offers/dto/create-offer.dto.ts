import { IsOptional } from 'class-validator';

export class CreateOfferDto {
  amount: number;

  @IsOptional()
  hidden: boolean;
  itemId: number;
}
