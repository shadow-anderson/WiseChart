import { Request } from 'express'

import { Body, Controller, Get, Param, Post, Req } from '@nestjs/common'
import { RequestHelper } from '@server/helpers/request'
import { EventService } from '@server/libraries/event'
import { AlertDomainFacade } from '@server/modules/alert/domain'
import { AuthenticationDomainFacade } from '@server/modules/authentication/domain'
import { AlertApplicationEvent } from './alert.application.event'
import { AlertCreateDto } from './alert.dto'

import { UserDomainFacade } from '../../user/domain'

@Controller('/v1/users')
export class AlertByUserController {
  constructor(
    private userDomainFacade: UserDomainFacade,

    private alertDomainFacade: AlertDomainFacade,
    private eventService: EventService,
    private authenticationDomainFacade: AuthenticationDomainFacade,
  ) {}

  @Get('/user/:userId/alerts')
  async findManyUserId(
    @Param('userId') userId: string,
    @Req() request: Request,
  ) {
    const queryOptions = RequestHelper.getQueryOptions(request)

    const parent = await this.userDomainFacade.findOneByIdOrFail(userId)

    const items = await this.alertDomainFacade.findManyByUser(
      parent,
      queryOptions,
    )

    return items
  }

  @Post('/user/:userId/alerts')
  async createByUserId(
    @Param('userId') userId: string,
    @Body() body: AlertCreateDto,
    @Req() request: Request,
  ) {
    const { user } = this.authenticationDomainFacade.getRequestPayload(request)

    const valuesUpdated = { ...body, userId }

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
