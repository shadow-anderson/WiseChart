import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { DatabaseHelper } from '../../../core/database'
import { RequestHelper } from '../../../helpers/request'
import { StockData } from './stockData.model'

import { Stock } from '../../stock/domain'

@Injectable()
export class StockDataDomainFacade {
  constructor(
    @InjectRepository(StockData)
    private repository: Repository<StockData>,
    private databaseHelper: DatabaseHelper,
  ) {}

  async create(values: Partial<StockData>): Promise<StockData> {
    return this.repository.save(values)
  }

  async update(
    item: StockData,
    values: Partial<StockData>,
  ): Promise<StockData> {
    const itemUpdated = { ...item, ...values }

    return this.repository.save(itemUpdated)
  }

  async delete(item: StockData): Promise<void> {
    await this.repository.softDelete(item.id)
  }

  async findMany(
    queryOptions: RequestHelper.QueryOptions<StockData> = {},
  ): Promise<StockData[]> {
    const query = this.databaseHelper.applyQueryOptions(
      this.repository,
      queryOptions,
    )

    return query.getMany()
  }

  async findOneByIdOrFail(
    id: string,
    queryOptions: RequestHelper.QueryOptions<StockData> = {},
  ): Promise<StockData> {
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

  async findManyByStock(
    item: Stock,
    queryOptions: RequestHelper.QueryOptions<StockData> = {},
  ): Promise<StockData[]> {
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
