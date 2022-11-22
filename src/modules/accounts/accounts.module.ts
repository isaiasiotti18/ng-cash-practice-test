import { Module } from '@nestjs/common';
import { AccountsService } from './accounts.service';
import { AccountRepository } from './account.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AccountEntityTypeOrm } from './entities/account.entity';

@Module({
  imports: [TypeOrmModule.forFeature([AccountEntityTypeOrm])],
  controllers: [],
  providers: [AccountsService, AccountRepository],
  exports: [AccountRepository],
})
export class AccountsModule {}
