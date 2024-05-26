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
import { Stock, StockDomainFacade } from '@server/modules/stock/domain'
import { AuthenticationDomainFacade } from '@server/modules/authentication/domain'
import { RequestHelper } from '../../../helpers/request'
import { StockApplicationEvent } from './stock.application.event'
import { StockCreateDto, StockUpdateDto } from './stock.dto'
import { StockService } from '@server/modules/stock/application/stock.service'

@Controller('/v1/stocks')
export class StockController {
  constructor(
    private eventService: EventService,
    private stockDomainFacade: StockDomainFacade,
    private authenticationDomainFacade: AuthenticationDomainFacade,
    private stockService: StockService,
  ) {}

  @Get('/')
  async findMany(@Req() request: Request) {
    const queryOptions = RequestHelper.getQueryOptions(request)

    const items = await this.stockDomainFacade.findMany(queryOptions)

    return items
  }

  @Post('/')
  async create(@Body() body: StockCreateDto, @Req() request: Request) {
    const { user } = this.authenticationDomainFacade.getRequestPayload(request)

    const item = await this.stockDomainFacade.create(body)

    await this.eventService.emit<StockApplicationEvent.StockCreated.Payload>(
      StockApplicationEvent.StockCreated.key,
      {
        id: item.id,
        userId: user.id,
      },
    )

    return item
  }

  @Get('/:stockId')
  async findOne(@Param('stockId') stockId: string, @Req() request: Request) {
    const queryOptions = RequestHelper.getQueryOptions(request)

    const item = await this.stockDomainFacade.findOneByIdOrFail(
      stockId,
      queryOptions,
    )

    return item
  }

  @Patch('/:stockId')
  async update(
    @Param('stockId') stockId: string,
    @Body() body: StockUpdateDto,
  ) {
    const item = await this.stockDomainFacade.findOneByIdOrFail(stockId)

    const itemUpdated = await this.stockDomainFacade.update(
      item,
      body as Partial<Stock>,
    )
    return itemUpdated
  }

  @Delete('/:stockId')
  async delete(@Param('stockId') stockId: string) {
    const item = await this.stockDomainFacade.findOneByIdOrFail(stockId)

    await this.stockDomainFacade.delete(item)

    return item
  }

  @Get('/:stockId/chart')
  async getStockChartData(@Param('stockId') stockId: string) {
    const chartData = await this.stockService.fetchStockChartData(stockId)
    return chartData
  }
}
