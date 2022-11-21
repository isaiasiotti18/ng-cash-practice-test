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
} from '@nestjs/common';
import { TransactionsService } from './transactions.service';
import { CreateTransactionDto } from './dto/create-transaction.dto';
import { UpdateTransactionDto } from './dto/update-transaction.dto';
import { TransactionOutput } from 'src/core/domain/transactions/interfaces/transaction-output.interface';

@Controller('transactions')
export class TransactionsController {
  constructor(
    private readonly transactionsService: TransactionsService,
    private readonly cashoutUsecase: CashoutUsecase,
  ) {}

  @Post('/money-transfer')
  async create(
    @Body() createTransactionDto: CreateTransactionDto,
    @Request() req: AuthRequest,
  ): Promise<TransactionOutput> {
    try {
      console.log(await req.user);
      return await this.cashoutUsecase.execute({
        ...createTransactionDto,
        debitedAccountId: req.user.accountId,
      });
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  @Get()
  findAll() {
    return this.transactionsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.transactionsService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateTransactionDto: UpdateTransactionDto,
  ) {
    return this.transactionsService.update(+id, updateTransactionDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.transactionsService.remove(+id);
  }
}
