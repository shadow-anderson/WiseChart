import { Request } from 'express'

import { Body, Controller, Get, Param, Post, Req } from '@nestjs/common'
import { RequestHelper } from '@server/helpers/request'
import { EventService } from '@server/libraries/event'
import { UserStockPreferenceDomainFacade } from '@server/modules/userStockPreference/domain'
import { AuthenticationDomainFacade } from '@server/modules/authentication/domain'
import { UserStockPreferenceApplicationEvent } from './userStockPreference.application.event'
import { UserStockPreferenceCreateDto } from './userStockPreference.dto'

import { UserDomainFacade } from '../../user/domain'

@Controller('/v1/users')
export class UserStockPreferenceByUserController {
  constructor(
    private userDomainFacade: UserDomainFacade,

    private userStockPreferenceDomainFacade: UserStockPreferenceDomainFacade,
    private eventService: EventService,
    private authenticationDomainFacade: AuthenticationDomainFacade,
  ) {}

  @Get('/user/:userId/userStockPreferences')
  async findManyUserId(
    @Param('userId') userId: string,
    @Req() request: Request,
  ) {
    const queryOptions = RequestHelper.getQueryOptions(request)

    const parent = await this.userDomainFacade.findOneByIdOrFail(userId)

    const items = await this.userStockPreferenceDomainFacade.findManyByUser(
      parent,
      queryOptions,
    )

    return items
  }

  @Post('/user/:userId/userStockPreferences')
  async createByUserId(
    @Param('userId') userId: string,
    @Body() body: UserStockPreferenceCreateDto,
    @Req() request: Request,
  ) {
    const { user } = this.authenticationDomainFacade.getRequestPayload(request)

    const valuesUpdated = { ...body, userId }

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
