import { Request } from 'express'

import { Body, Controller, Get, Param, Post, Req } from '@nestjs/common'
import { RequestHelper } from '@server/helpers/request'
import { EventService } from '@server/libraries/event'
import { AlertDomainFacade } from '@server/modules/alert/domain'
import { AuthenticationDomainFacade } from '@server/modules/authentication/domain'
import { AlertApplicationEvent } from './alert.application.event'
import { AlertCreateDto } from './alert.dto'

import { StockDomainFacade } from '../../stock/domain'

@Controller('/v1/stocks')
export class AlertByStockController {
  constructor(
    private stockDomainFacade: StockDomainFacade,

    private alertDomainFacade: AlertDomainFacade,
    private eventService: EventService,
    private authenticationDomainFacade: AuthenticationDomainFacade,
  ) {}

  @Get('/stock/:stockId/alerts')
  async findManyStockId(
    @Param('stockId') stockId: string,
    @Req() request: Request,
  ) {
    const queryOptions = RequestHelper.getQueryOptions(request)

    const parent = await this.stockDomainFacade.findOneByIdOrFail(stockId)

    const items = await this.alertDomainFacade.findManyByStock(
      parent,
      queryOptions,
    )

    return items
  }

  @Post('/stock/:stockId/alerts')
  async createByStockId(
    @Param('stockId') stockId: string,
    @Body() body: AlertCreateDto,
    @Req() request: Request,
  ) {
    const { user } = this.authenticationDomainFacade.getRequestPayload(request)

    const valuesUpdated = { ...body, stockId }

    const item = await this.alertDomainFacade.create(valuesUpdated)

    await this.eventService.emit<AlertApplicationEvent.AlertCreated.Payload>(
      AlertApplicationEvent.AlertCreated.key,
      {
        id: item.id,
        userId: user.id,
      },
    )

    return item
  }
}
