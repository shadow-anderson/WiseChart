import { Request } from 'express'

import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Req,
} from '@nestjs/common'
import { EventService } from '@server/libraries/event'
import {
  EducationalResource,
  EducationalResourceDomainFacade,
} from '@server/modules/educationalResource/domain'
import { AuthenticationDomainFacade } from '@server/modules/authentication/domain'
import { RequestHelper } from '../../../helpers/request'
import { EducationalResourceApplicationEvent } from './educationalResource.application.event'
import {
  EducationalResourceCreateDto,
  EducationalResourceUpdateDto,
} from './educationalResource.dto'

@Controller('/v1/educationalResources')
export class EducationalResourceController {
  constructor(
    private eventService: EventService,
    private educationalResourceDomainFacade: EducationalResourceDomainFacade,
    private authenticationDomainFacade: AuthenticationDomainFacade,
  ) {}

  @Get('/')
  async findMany(@Req() request: Request) {
    const queryOptions = RequestHelper.getQueryOptions(request)

    const items =
      await this.educationalResourceDomainFacade.findMany(queryOptions)

    return items
  }

  @Post('/')
  async create(
    @Body() body: EducationalResourceCreateDto,
    @Req() request: Request,
  ) {
    const { user } = this.authenticationDomainFacade.getRequestPayload(request)

    const item = await this.educationalResourceDomainFacade.create(body)

    await this.eventService.emit<EducationalResourceApplicationEvent.EducationalResourceCreated.Payload>(
      EducationalResourceApplicationEvent.EducationalResourceCreated.key,
      {
        id: item.id,
        userId: user.id,
      },
    )

    return item
  }

  @Get('/:educationalResourceId')
  async findOne(
    @Param('educationalResourceId') educationalResourceId: string,
    @Req() request: Request,
  ) {
    const queryOptions = RequestHelper.getQueryOptions(request)

    const item = await this.educationalResourceDomainFacade.findOneByIdOrFail(
      educationalResourceId,
      queryOptions,
    )

    return item
  }

  @Patch('/:educationalResourceId')
  async update(
    @Param('educationalResourceId') educationalResourceId: string,
    @Body() body: EducationalResourceUpdateDto,
  ) {
    const item = await this.educationalResourceDomainFacade.findOneByIdOrFail(
      educationalResourceId,
    )

    const itemUpdated = await this.educationalResourceDomainFacade.update(
      item,
      body as Partial<EducationalResource>,
    )
    return itemUpdated
  }

  @Delete('/:educationalResourceId')
  async delete(@Param('educationalResourceId') educationalResourceId: string) {
    const item = await this.educationalResourceDomainFacade.findOneByIdOrFail(
      educationalResourceId,
    )

    await this.educationalResourceDomainFacade.delete(item)

    return item
  }
}
