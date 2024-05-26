import { Module } from '@nestjs/common'
import { AuthenticationDomainModule } from '@server/modules/authentication/domain'
import { EducationalResourceDomainModule } from '../domain'
import { EducationalResourceController } from './educationalResource.controller'

@Module({
  imports: [AuthenticationDomainModule, EducationalResourceDomainModule],
  controllers: [EducationalResourceController],
  providers: [],
})
export class EducationalResourceApplicationModule {}
