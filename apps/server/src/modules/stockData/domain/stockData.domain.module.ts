import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { DatabaseHelperModule } from '../../../core/database'
import { StockDataDomainFacade } from './stockData.domain.facade'
import { StockData } from './stockData.model'

@Module({
  imports: [TypeOrmModule.forFeature([StockData]), DatabaseHelperModule],
  providers: [StockDataDomainFacade, StockDataDomainFacade],
  exports: [StockDataDomainFacade],
})
export class StockDataDomainModule {}
