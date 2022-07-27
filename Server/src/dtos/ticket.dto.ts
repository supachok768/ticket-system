import { IsString, IsBoolean, IsOptional, IsDecimal, IsInt } from 'class-validator';

export class CreateTicketDto {
  @IsString()
  public name: string;

  @IsDecimal()
  public price: number;

  @IsInt()
  public amountLimitPerDay: number;

  @IsInt()
  public minimumBuy: number;

  @IsOptional()
  @IsBoolean()
  public isActive: boolean;
}
