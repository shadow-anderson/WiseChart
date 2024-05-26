import { Request } from 'express'

import { Body, Controller, Get, Param, Post, Req } from '@nestjs/common'
import { RequestHelper } from '@server/helpers/request'
import { EventService } from '@server/libraries/event'
import { StockDataDomainFacade } from '@server/modules/stockData/domain'
import { AuthenticationDomainFacade } from '@server/modules/authentication/domain'
import { StockDataApplicationEvent } from './stockData.application.event'
import { StockDataCreateDto } from './stockData.dto'

import { StockDomainFacade } from '../../stock/domain'

@Controller('/v1/stocks')
export class StockDataByStockController {
  constructor(
    private stockDomainFacade: StockDomainFacade,

    private stockDataDomainFacade: StockDataDomainFacade,
    private eventService: EventService,
    private authenticationDomainFacade: AuthenticationDomainFacade,
  ) {}

  @Get('/stock/:stockId/stockDatas')
  async findManyStockId(
    @Param('stockId') stockId: string,
    @Req() request: Request,
  ) {
    const queryOptions = RequestHelper.getQueryOptions(request)

    const parent = await this.stockDomainFacade.findOneByIdOrFail(stockId)

    const items = await this.stockDataDomainFacade.findManyByStock(
      parent,
      queryOptions,
    )

    return items
  }

  @Post('/stock/:stockId/stockDatas')
  async createByStockId(
    @Param('stockId') stockId: string,
    @Body() body: StockDataCreateDto,
    @Req() request: Request,
  ) {
    const { user } = this.authenticationDomainFacade.getRequestPayload(request)

    const valuesUpdated = { ...body, stockId }

    const item = await this.stockDataDomainFacade.create(valuesUpdated)

    await this.eventService.emit<StockDataApplicationEvent.StockDataCreated.Payload>(
      StockDataApplicationEvent.StockDataCreated.key,
      {
        id: item.id,
        userId: user.id,
      },
    )

    return item
  }
}
