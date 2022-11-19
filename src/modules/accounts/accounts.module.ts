import { Module } from '@nestjs/common';
import { AccountsService } from './accounts.service';
import { AccountsController } from './accounts.controller';
import { AccountRepository } from './account.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AccountEntityTypeOrm } from './entities/account.entity';

@Module({
  imports: [TypeOrmModule.forFeature([AccountEntityTypeOrm])],
  controllers: [AccountsController],
  providers: [AccountsService, AccountRepository],
  exports: [AccountRepository],
})
export class AccountsModule {}
