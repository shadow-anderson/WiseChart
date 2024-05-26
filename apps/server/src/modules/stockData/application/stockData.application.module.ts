import { Module } from '@nestjs/common'
import { AuthenticationDomainModule } from '@server/modules/authentication/domain'
import { StockDataDomainModule } from '../domain'
import { StockDataController } from './stockData.controller'

import { StockDomainModule } from '../../../modules/stock/domain'

import { StockDataByStockController } from './stockDataByStock.controller'

@Module({
  imports: [
    AuthenticationDomainModule,
    StockDataDomainModule,

    StockDomainModule,
  ],
  controllers: [StockDataController, StockDataByStockController],
  providers: [],
})
export class StockDataApplicationModule {}
