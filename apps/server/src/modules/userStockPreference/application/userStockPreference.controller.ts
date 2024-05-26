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
  UserStockPreference,
  UserStockPreferenceDomainFacade,
} from '@server/modules/userStockPreference/domain'
import { AuthenticationDomainFacade } from '@server/modules/authentication/domain'
import { RequestHelper } from '../../../helpers/request'
import { UserStockPreferenceApplicationEvent } from './userStockPreference.application.event'
import {
  UserStockPreferenceCreateDto,
  UserStockPreferenceUpdateDto,
} from './userStockPreference.dto'

@Controller('/v1/userStockPreferences')
export class UserStockPreferenceController {
  constructor(
    private eventService: EventService,
    private userStockPreferenceDomainFacade: UserStockPreferenceDomainFacade,
    private authenticationDomainFacade: AuthenticationDomainFacade,
  ) {}

  @Get('/')
  async findMany(@Req() request: Request) {
    const queryOptions = RequestHelper.getQueryOptions(request)

    const items =
      await this.userStockPreferenceDomainFacade.findMany(queryOptions)

    return items
  }

  @Post('/')
  async create(
    @Body() body: UserStockPreferenceCreateDto,
    @Req() request: Request,
  ) {
    const { user } = this.authenticationDomainFacade.getRequestPayload(request)

    const item = await this.userStockPreferenceDomainFacade.create(body)

    await this.eventService.emit<UserStockPreferenceApplicationEvent.UserStockPreferenceCreated.Payload>(
      UserStockPreferenceApplicationEvent.UserStockPreferenceCreated.key,
      {
        id: item.id,
        userId: user.id,
      },
    )

    return item
  }

  @Get('/:userStockPreferenceId')
  async findOne(
    @Param('userStockPreferenceId') userStockPreferenceId: string,
    @Req() request: Request,
  ) {
    const queryOptions = RequestHelper.getQueryOptions(request)

    const item = await this.userStockPreferenceDomainFacade.findOneByIdOrFail(
      userStockPreferenceId,
      queryOptions,
    )

    return item
  }

  @Patch('/:userStockPreferenceId')
  async update(
    @Param('userStockPreferenceId') userStockPreferenceId: string,
    @Body() body: UserStockPreferenceUpdateDto,
  ) {
    const item = await this.userStockPreferenceDomainFacade.findOneByIdOrFail(
      userStockPreferenceId,
    )

    const itemUpdated = await this.userStockPreferenceDomainFacade.update(
      item,
      body as Partial<UserStockPreference>,
    )
    return itemUpdated
  }

  @Delete('/:userStockPreferenceId')
  async delete(@Param('userStockPreferenceId') userStockPreferenceId: string) {
    const item = await this.userStockPreferenceDomainFacade.findOneByIdOrFail(
      userStockPreferenceId,
    )

    await this.userStockPreferenceDomainFacade.delete(item)

    return item
  }
}
