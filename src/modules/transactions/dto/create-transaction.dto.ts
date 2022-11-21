import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateTransactionDto {
  @IsNotEmpty()
  @IsString()
  usernameCashIn: string;

  @IsOptional()
  debitedAccountId?: string;

  @IsOptional()
  creditedAccountId?: string;

  @IsNotEmpty()
  @IsNumber()
  value: number;
}
