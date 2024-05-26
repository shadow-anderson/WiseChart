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
import { Alert, AlertDomainFacade } from '@server/modules/alert/domain'
import { AuthenticationDomainFacade } from '@server/modules/authentication/domain'
import { RequestHelper } from '../../../helpers/request'
import { AlertApplicationEvent } from './alert.application.event'
import { AlertCreateDto, AlertUpdateDto } from './alert.dto'

@Controller('/v1/alerts')
export class AlertController {
  constructor(
    private eventService: EventService,
    private alertDomainFacade: AlertDomainFacade,
    private authenticationDomainFacade: AuthenticationDomainFacade,
  ) {}

  @Get('/')
  async findMany(@Req() request: Request) {
    const queryOptions = RequestHelper.getQueryOptions(request)

    const items = await this.alertDomainFacade.findMany(queryOptions)

    return items
  }

  @Post('/')
  async create(@Body() body: AlertCreateDto, @Req() request: Request) {
    const { user } = this.authenticationDomainFacade.getRequestPayload(request)

    const item = await this.alertDomainFacade.create(body)

    await this.eventService.emit<AlertApplicationEvent.AlertCreated.Payload>(
      AlertApplicationEvent.AlertCreated.key,
      {
        id: item.id,
        userId: user.id,
      },
    )

    return item
  }

  @Get('/:alertId')
  async findOne(@Param('alertId') alertId: string, @Req() request: Request) {
    const queryOptions = RequestHelper.getQueryOptions(request)

    const item = await this.alertDomainFacade.findOneByIdOrFail(
      alertId,
      queryOptions,
    )

    return item
  }

  @Patch('/:alertId')
  async update(
    @Param('alertId') alertId: string,
    @Body() body: AlertUpdateDto,
  ) {
    const item = await this.alertDomainFacade.findOneByIdOrFail(alertId)

    const itemUpdated = await this.alertDomainFacade.update(
      item,
      body as Partial<Alert>,
    )
    return itemUpdated
  }

  @Delete('/:alertId')
  async delete(@Param('alertId') alertId: string) {
    const item = await this.alertDomainFacade.findOneByIdOrFail(alertId)

    await this.alertDomainFacade.delete(item)

    return item
  }
}
