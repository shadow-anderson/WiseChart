import { Module } from '@nestjs/common'
import { AuthenticationApplicationModule } from './authentication/application'
import { AuthorizationApplicationModule } from './authorization/application'
import { UserApplicationModule } from './user/application'

import { StockApplicationModule } from './stock/application'

import { StockDataApplicationModule } from './stockData/application'

import { UserStockPreferenceApplicationModule } from './userStockPreference/application'

import { AlertApplicationModule } from './alert/application'

import { AiInsightApplicationModule } from './aiInsight/application'

import { EducationalResourceApplicationModule } from './educationalResource/application'

import { AiApplicationModule } from './ai/application/ai.application.module'
import { BillingApplicationModule } from './billing/application'
import { NotificationApplicationModule } from './notification/application/notification.application.module'
import { UploadApplicationModule } from './upload/application/upload.application.module'

@Module({
  imports: [
    AuthenticationApplicationModule,
    UserApplicationModule,
    AuthorizationApplicationModule,
    NotificationApplicationModule,
    AiApplicationModule,
    UploadApplicationModule,
    BillingApplicationModule,

    StockApplicationModule,

    StockDataApplicationModule,

    UserStockPreferenceApplicationModule,

    AlertApplicationModule,

    AiInsightApplicationModule,

    EducationalResourceApplicationModule,
  ],
  controllers: [],
  providers: [],
})
export class AppApplicationModule {}
