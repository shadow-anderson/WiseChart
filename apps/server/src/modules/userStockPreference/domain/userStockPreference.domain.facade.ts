import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { DatabaseHelper } from '../../../core/database'
import { RequestHelper } from '../../../helpers/request'
import { UserStockPreference } from './userStockPreference.model'

import { User } from '../../user/domain'

import { Stock } from '../../stock/domain'

@Injectable()
export class UserStockPreferenceDomainFacade {
  constructor(
    @InjectRepository(UserStockPreference)
    private repository: Repository<UserStockPreference>,
    private databaseHelper: DatabaseHelper,
  ) {}

  async create(
    values: Partial<UserStockPreference>,
  ): Promise<UserStockPreference> {
    return this.repository.save(values)
  }

  async update(
    item: UserStockPreference,
    values: Partial<UserStockPreference>,
  ): Promise<UserStockPreference> {
    const itemUpdated = { ...item, ...values }

    return this.repository.save(itemUpdated)
  }

  async delete(item: UserStockPreference): Promise<void> {
    await this.repository.softDelete(item.id)
  }

  async findMany(
    queryOptions: RequestHelper.QueryOptions<UserStockPreference> = {},
  ): Promise<UserStockPreference[]> {
    const query = this.databaseHelper.applyQueryOptions(
      this.repository,
      queryOptions,
    )

    return query.getMany()
  }

  async findOneByIdOrFail(
    id: string,
    queryOptions: RequestHelper.QueryOptions<UserStockPreference> = {},
  ): Promise<UserStockPreference> {
    if (!id) {
      this.databaseHelper.invalidQueryWhere('id')
    }

    const queryOptionsEnsured = {
      includes: queryOptions?.includes,
      filters: {
        id: id,
      },
    }

    const query = this.databaseHelper.applyQueryOptions(
      this.repository,
      queryOptionsEnsured,
    )

    const item = await query.getOne()

    if (!item) {
      this.databaseHelper.notFoundByQuery(queryOptionsEnsured.filters)
    }

    return item
  }

  async findManyByUser(
    item: User,
    queryOptions: RequestHelper.QueryOptions<UserStockPreference> = {},
  ): Promise<UserStockPreference[]> {
    if (!item) {
      this.databaseHelper.invalidQueryWhere('user')
    }

    const queryOptionsEnsured = {
      includes: queryOptions.includes,
      orders: queryOptions.orders,
      filters: {
        ...queryOptions.filters,
        userId: item.id,
      },
    }

    const query = this.databaseHelper.applyQueryOptions(
      this.repository,
      queryOptionsEnsured,
    )

    return query.getMany()
  }

  async findManyByStock(
    item: Stock,
    queryOptions: RequestHelper.QueryOptions<UserStockPreference> = {},
  ): Promise<UserStockPreference[]> {
    if (!item) {
      this.databaseHelper.invalidQueryWhere('stock')
    }

    const queryOptionsEnsured = {
      includes: queryOptions.includes,
      orders: queryOptions.orders,
      filters: {
        ...queryOptions.filters,
        stockId: item.id,
      },
    }

    const query = this.databaseHelper.applyQueryOptions(
      this.repository,
      queryOptionsEnsured,
    )

    return query.getMany()
  }
}
