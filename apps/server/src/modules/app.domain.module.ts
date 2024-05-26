import { Module } from '@nestjs/common'
import { AuthenticationDomainModule } from './authentication/domain'
import { AuthorizationDomainModule } from './authorization/domain'
import { UserDomainModule } from './user/domain'
import { NotificationDomainModule } from './notification/domain'
import { StockDomainModule } from './stock/domain'
import { StockDataDomainModule } from './stockData/domain'
import { UserStockPreferenceDomainModule } from './userStockPreference/domain'
import { AlertDomainModule } from './alert/domain'
import { AiInsightDomainModule } from './aiInsight/domain'
import { EducationalResourceDomainModule } from './educationalResource/domain'

@Module({
  imports: [
    AuthenticationDomainModule,
    AuthorizationDomainModule,
    UserDomainModule,
    NotificationDomainModule,
    StockDomainModule,
    StockDataDomainModule,
    UserStockPreferenceDomainModule,
    AlertDomainModule,
    AiInsightDomainModule,
    EducationalResourceDomainModule,
  ],
  controllers: [],
  providers: [],
})
export class AppDomainModule {}
