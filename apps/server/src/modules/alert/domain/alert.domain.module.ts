import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { DatabaseHelperModule } from '../../../core/database'
import { AlertDomainFacade } from './alert.domain.facade'
import { Alert } from './alert.model'

@Module({
  imports: [TypeOrmModule.forFeature([Alert]), DatabaseHelperModule],
  providers: [AlertDomainFacade, AlertDomainFacade],
  exports: [AlertDomainFacade],
})
export class AlertDomainModule {}
