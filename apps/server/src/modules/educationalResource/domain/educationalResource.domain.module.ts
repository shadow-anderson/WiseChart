import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { DatabaseHelperModule } from '../../../core/database'
import { EducationalResourceDomainFacade } from './educationalResource.domain.facade'
import { EducationalResource } from './educationalResource.model'

@Module({
  imports: [
    TypeOrmModule.forFeature([EducationalResource]),
    DatabaseHelperModule,
  ],
  providers: [EducationalResourceDomainFacade, EducationalResourceDomainFacade],
  exports: [EducationalResourceDomainFacade],
})
export class EducationalResourceDomainModule {}
