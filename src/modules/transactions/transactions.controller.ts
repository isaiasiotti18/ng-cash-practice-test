import { FilterTransactionsByDateOrCashoutOrCashIn } from './../../core/app/transactions/usecases/filter-transactions-by.usecase';
import { FilterTransactions } from './../../core/domain/transactions/interfaces/filter-transactions.interface';
import { AuthRequest } from 'src/shared/auth/models/AuthRequest';
import { CashoutUsecase } from './../../core/app/transactions/usecases/cash-out.usecase';
import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Request,
  HttpStatus,
  HttpException,
  Req,
  RequestMapping,
  Query,
} from '@nestjs/common';
import { TransactionsService } from './transactions.service';
import { CreateTransactionDto } from './dto/create-transaction.dto';
import { UpdateTransactionDto } from './dto/update-transaction.dto';
import { TransactionOutput } from 'src/core/domain/transactions/interfaces/transaction-output.interface';
import { parse } from 'querystring';

@Controller('transactions')
export class TransactionsController {
  constructor(
    private readonly transactionsService: TransactionsService,
    private readonly cashoutUsecase: CashoutUsecase,
    private readonly filterTransactionsByDateOrCashoutOrCashIn: FilterTransactionsByDateOrCashoutOrCashIn,
  ) {}

  @Post('/money-transfer')
  async create(
    @Body() createTransactionDto: CreateTransactionDto,
    @Request() req: AuthRequest,
  ): Promise<TransactionOutput> {
    try {
      return await this.cashoutUsecase.execute({
        ...createTransactionDto,
        debitedAccountId: req.user.accountId,
      });
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  @Get('/find-transactions')
  async findTransactions(
    @Query() filters: FilterTransactions,
    @Request() req: AuthRequest,
  ) {
    const { createdAt, cashIn, cashOut } = filters;

    return await this.filterTransactionsByDateOrCashoutOrCashIn.execute(
      req.user.id,
      {
        createdAt,
        cashIn,
        cashOut,
      },
    );
  }
}
