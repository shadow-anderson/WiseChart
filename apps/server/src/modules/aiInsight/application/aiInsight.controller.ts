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
  AiInsight,
  AiInsightDomainFacade,
} from '@server/modules/aiInsight/domain'
import { AuthenticationDomainFacade } from '@server/modules/authentication/domain'
import { RequestHelper } from '../../../helpers/request'
import { AiInsightApplicationEvent } from './aiInsight.application.event'
import { AiInsightCreateDto, AiInsightUpdateDto } from './aiInsight.dto'

@Controller('/v1/aiInsights')
export class AiInsightController {
  constructor(
    private eventService: EventService,
    private aiInsightDomainFacade: AiInsightDomainFacade,
    private authenticationDomainFacade: AuthenticationDomainFacade,
  ) {}

  @Get('/')
  async findMany(@Req() request: Request) {
    const queryOptions = RequestHelper.getQueryOptions(request)

    const items = await this.aiInsightDomainFacade.findMany(queryOptions)

    return items
  }

  @Post('/')
  async create(@Body() body: AiInsightCreateDto, @Req() request: Request) {
    const { user } = this.authenticationDomainFacade.getRequestPayload(request)

    const item = await this.aiInsightDomainFacade.create(body)

    await this.eventService.emit<AiInsightApplicationEvent.AiInsightCreated.Payload>(
      AiInsightApplicationEvent.AiInsightCreated.key,
      {
        id: item.id,
        userId: user.id,
      },
    )

    return item
  }

  @Get('/:aiInsightId')
  async findOne(
    @Param('aiInsightId') aiInsightId: string,
    @Req() request: Request,
  ) {
    const queryOptions = RequestHelper.getQueryOptions(request)

    const item = await this.aiInsightDomainFacade.findOneByIdOrFail(
      aiInsightId,
      queryOptions,
    )

    return item
  }

  @Patch('/:aiInsightId')
  async update(
    @Param('aiInsightId') aiInsightId: string,
    @Body() body: AiInsightUpdateDto,
  ) {
    const item = await this.aiInsightDomainFacade.findOneByIdOrFail(aiInsightId)

    const itemUpdated = await this.aiInsightDomainFacade.update(
      item,
      body as Partial<AiInsight>,
    )
    return itemUpdated
  }

  @Delete('/:aiInsightId')
  async delete(@Param('aiInsightId') aiInsightId: string) {
    const item = await this.aiInsightDomainFacade.findOneByIdOrFail(aiInsightId)

    await this.aiInsightDomainFacade.delete(item)

    return item
  }
}
