import { Module } from '@nestjs/common'
import { AuthenticationDomainModule } from '@server/modules/authentication/domain'
import { AlertDomainModule } from '../domain'
import { AlertController } from './alert.controller'

import { UserDomainModule } from '../../../modules/user/domain'

import { AlertByUserController } from './alertByUser.controller'

import { StockDomainModule } from '../../../modules/stock/domain'

import { AlertByStockController } from './alertByStock.controller'

@Module({
  imports: [
    AuthenticationDomainModule,
    AlertDomainModule,

    UserDomainModule,

    StockDomainModule,
  ],
  controllers: [AlertController, AlertByUserController, AlertByStockController],
  providers: [],
})
export class AlertApplicationModule {}
