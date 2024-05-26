import { Request } from 'express'

import { Body, Controller, Get, Param, Post, Req } from '@nestjs/common'
import { RequestHelper } from '@server/helpers/request'
import { EventService } from '@server/libraries/event'
import { AiInsightDomainFacade } from '@server/modules/aiInsight/domain'
import { AuthenticationDomainFacade } from '@server/modules/authentication/domain'
import { AiInsightApplicationEvent } from './aiInsight.application.event'
import { AiInsightCreateDto } from './aiInsight.dto'

import { StockDomainFacade } from '../../stock/domain'

@Controller('/v1/stocks')
export class AiInsightByStockController {
  constructor(
    private stockDomainFacade: StockDomainFacade,

    private aiInsightDomainFacade: AiInsightDomainFacade,
    private eventService: EventService,
    private authenticationDomainFacade: AuthenticationDomainFacade,
  ) {}

  @Get('/stock/:stockId/aiInsights')
  async findManyStockId(
    @Param('stockId') stockId: string,
    @Req() request: Request,
  ) {
    const queryOptions = RequestHelper.getQueryOptions(request)

    const parent = await this.stockDomainFacade.findOneByIdOrFail(stockId)

    const items = await this.aiInsightDomainFacade.findManyByStock(
      parent,
      queryOptions,
    )

    return items
  }

  @Post('/stock/:stockId/aiInsights')
  async createByStockId(
    @Param('stockId') stockId: string,
    @Body() body: AiInsightCreateDto,
    @Req() request: Request,
  ) {
    const { user } = this.authenticationDomainFacade.getRequestPayload(request)

    const valuesUpdated = { ...body, stockId }

    const item = await this.aiInsightDomainFacade.create(valuesUpdated)

    await this.eventService.emit<AiInsightApplicationEvent.AiInsightCreated.Payload>(
      AiInsightApplicationEvent.AiInsightCreated.key,
      {
        id: item.id,
        userId: user.id,
      },
    )

    return item
  }
}
