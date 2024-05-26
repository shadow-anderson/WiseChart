import { Module } from '@nestjs/common'
import { AuthenticationDomainModule } from '@server/modules/authentication/domain'
import { AiInsightDomainModule } from '../domain'
import { AiInsightController } from './aiInsight.controller'

import { StockDomainModule } from '../../../modules/stock/domain'

import { AiInsightByStockController } from './aiInsightByStock.controller'

@Module({
  imports: [
    AuthenticationDomainModule,
    AiInsightDomainModule,

    StockDomainModule,
  ],
  controllers: [AiInsightController, AiInsightByStockController],
  providers: [],
})
export class AiInsightApplicationModule {}
