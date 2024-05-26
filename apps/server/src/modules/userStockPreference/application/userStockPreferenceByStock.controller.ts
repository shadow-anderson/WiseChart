import { Request } from 'express'

import { Body, Controller, Get, Param, Post, Req } from '@nestjs/common'
import { RequestHelper } from '@server/helpers/request'
import { EventService } from '@server/libraries/event'
import { UserStockPreferenceDomainFacade } from '@server/modules/userStockPreference/domain'
import { AuthenticationDomainFacade } from '@server/modules/authentication/domain'
import { UserStockPreferenceApplicationEvent } from './userStockPreference.application.event'
import { UserStockPreferenceCreateDto } from './userStockPreference.dto'

import { StockDomainFacade } from '../../stock/domain'

@Controller('/v1/stocks')
export class UserStockPreferenceByStockController {
  constructor(
    private stockDomainFacade: StockDomainFacade,

    private userStockPreferenceDomainFacade: UserStockPreferenceDomainFacade,
    private eventService: EventService,
    private authenticationDomainFacade: AuthenticationDomainFacade,
  ) {}

  @Get('/stock/:stockId/userStockPreferences')
  async findManyStockId(
    @Param('stockId') stockId: string,
    @Req() request: Request,
  ) {
    const queryOptions = RequestHelper.getQueryOptions(request)

    const parent = await this.stockDomainFacade.findOneByIdOrFail(stockId)

    const items = await this.userStockPreferenceDomainFacade.findManyByStock(
      parent,
      queryOptions,
    )

    return items
  }

  @Post('/stock/:stockId/userStockPreferences')
  async createByStockId(
    @Param('stockId') stockId: string,
    @Body() body: UserStockPreferenceCreateDto,
    @Req() request: Request,
  ) {
    const { user } = this.authenticationDomainFacade.getRequestPayload(request)

    const valuesUpdated = { ...body, stockId }

    const item =
      await this.userStockPreferenceDomainFacade.create(valuesUpdated)

    await this.eventService.emit<UserStockPreferenceApplicationEvent.UserStockPreferenceCreated.Payload>(
      UserStockPreferenceApplicationEvent.UserStockPreferenceCreated.key,
      {
        id: item.id,
        userId: user.id,
      },
    )

    return item
  }
}
