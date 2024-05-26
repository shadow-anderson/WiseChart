import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { DatabaseHelperModule } from '../../../core/database'
import { UserStockPreferenceDomainFacade } from './userStockPreference.domain.facade'
import { UserStockPreference } from './userStockPreference.model'

@Module({
  imports: [
    TypeOrmModule.forFeature([UserStockPreference]),
    DatabaseHelperModule,
  ],
  providers: [UserStockPreferenceDomainFacade, UserStockPreferenceDomainFacade],
  exports: [UserStockPreferenceDomainFacade],
})
export class UserStockPreferenceDomainModule {}
