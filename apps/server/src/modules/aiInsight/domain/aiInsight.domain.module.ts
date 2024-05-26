import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { DatabaseHelperModule } from '../../../core/database'
import { AiInsightDomainFacade } from './aiInsight.domain.facade'
import { AiInsight } from './aiInsight.model'

@Module({
  imports: [TypeOrmModule.forFeature([AiInsight]), DatabaseHelperModule],
  providers: [AiInsightDomainFacade, AiInsightDomainFacade],
  exports: [AiInsightDomainFacade],
})
export class AiInsightDomainModule {}
