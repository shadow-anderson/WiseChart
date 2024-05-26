import { Module } from '@nestjs/common'
import { SocketModule } from '@server/libraries/socket'
import { AuthorizationDomainModule } from '@server/modules/authorization/domain'
import { NotificationDomainModule } from '../domain'

import { NotificationStockSubscriber } from './subscribers/notification.stock.subscriber'

import { NotificationStockDataSubscriber } from './subscribers/notification.stockData.subscriber'

import { NotificationUserStockPreferenceSubscriber } from './subscribers/notification.userStockPreference.subscriber'

import { NotificationAlertSubscriber } from './subscribers/notification.alert.subscriber'

import { NotificationAiInsightSubscriber } from './subscribers/notification.aiInsight.subscriber'

import { NotificationEducationalResourceSubscriber } from './subscribers/notification.educationalResource.subscriber'

@Module({
  imports: [AuthorizationDomainModule, NotificationDomainModule, SocketModule],
  providers: [
    NotificationStockSubscriber,

    NotificationStockDataSubscriber,

    NotificationUserStockPreferenceSubscriber,

    NotificationAlertSubscriber,

    NotificationAiInsightSubscriber,

    NotificationEducationalResourceSubscriber,
  ],
  exports: [],
})
export class NotificationInfrastructureModule {}
