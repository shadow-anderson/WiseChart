import { Module } from '@nestjs/common'
import { AuthenticationDomainModule } from '@server/modules/authentication/domain'
import { UserStockPreferenceDomainModule } from '../domain'
import { UserStockPreferenceController } from './userStockPreference.controller'

import { UserDomainModule } from '../../../modules/user/domain'

import { UserStockPreferenceByUserController } from './userStockPreferenceByUser.controller'

import { StockDomainModule } from '../../../modules/stock/domain'

import { UserStockPreferenceByStockController } from './userStockPreferenceByStock.controller'

@Module({
  imports: [
    AuthenticationDomainModule,
    UserStockPreferenceDomainModule,

    UserDomainModule,

    StockDomainModule,
  ],
  controllers: [
    UserStockPreferenceController,

    UserStockPreferenceByUserController,

    UserStockPreferenceByStockController,
  ],
  providers: [],
})
export class UserStockPreferenceApplicationModule {}
