import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DatabaseHelperModule } from '../../../core/database';
import { StockDomainFacade } from './stock.domain.facade';
import { Stock } from './stock.model';

@Module({
  imports: [TypeOrmModule.forFeature([Stock]), DatabaseHelperModule],
  providers: [StockDomainFacade],
  exports: [StockDomainFacade],
})
export class StockDomainModule {}
