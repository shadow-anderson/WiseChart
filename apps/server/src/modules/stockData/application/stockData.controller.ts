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
  StockData,
  StockDataDomainFacade,
} from '@server/modules/stockData/domain'
import { AuthenticationDomainFacade } from '@server/modules/authentication/domain'
import { RequestHelper } from '../../../helpers/request'
import { StockDataApplicationEvent } from './stockData.application.event'
import { StockDataCreateDto, StockDataUpdateDto } from './stockData.dto'

@Controller('/v1/stockDatas')
export class StockDataController {
  constructor(
    private eventService: EventService,
    private stockDataDomainFacade: StockDataDomainFacade,
    private authenticationDomainFacade: AuthenticationDomainFacade,
  ) {}

  @Get('/')
  async findMany(@Req() request: Request) {
    const queryOptions = RequestHelper.getQueryOptions(request)

    const items = await this.stockDataDomainFacade.findMany(queryOptions)

    return items
  }

  @Post('/')
  async create(@Body() body: StockDataCreateDto, @Req() request: Request) {
    const { user } = this.authenticationDomainFacade.getRequestPayload(request)

    const item = await this.stockDataDomainFacade.create(body)

    await this.eventService.emit<StockDataApplicationEvent.StockDataCreated.Payload>(
      StockDataApplicationEvent.StockDataCreated.key,
      {
        id: item.id,
        userId: user.id,
      },
    )

    return item
  }

  @Get('/:stockDataId')
  async findOne(
    @Param('stockDataId') stockDataId: string,
    @Req() request: Request,
  ) {
    const queryOptions = RequestHelper.getQueryOptions(request)

    const item = await this.stockDataDomainFacade.findOneByIdOrFail(
      stockDataId,
      queryOptions,
    )

    return item
  }

  @Patch('/:stockDataId')
  async update(
    @Param('stockDataId') stockDataId: string,
    @Body() body: StockDataUpdateDto,
  ) {
    const item = await this.stockDataDomainFacade.findOneByIdOrFail(stockDataId)

    const itemUpdated = await this.stockDataDomainFacade.update(
      item,
      body as Partial<StockData>,
    )
    return itemUpdated
  }

  @Delete('/:stockDataId')
  async delete(@Param('stockDataId') stockDataId: string) {
    const item = await this.stockDataDomainFacade.findOneByIdOrFail(stockDataId)

    await this.stockDataDomainFacade.delete(item)

    return item
  }
}
