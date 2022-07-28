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

export class BuyTicketDto {
  @IsInt()
  public ticketId: number;
  
  @IsOptional()
  @IsInt()
  public userId: number;

  @IsString()
  public name: string;

  @IsInt()
  public amount: number;
}
