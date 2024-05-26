import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { DatabaseHelper } from '../../../core/database'
import { RequestHelper } from '../../../helpers/request'
import { AiInsight } from './aiInsight.model'

import { Stock } from '../../stock/domain'

@Injectable()
export class AiInsightDomainFacade {
  constructor(
    @InjectRepository(AiInsight)
    private repository: Repository<AiInsight>,
    private databaseHelper: DatabaseHelper,
  ) {}

  async create(values: Partial<AiInsight>): Promise<AiInsight> {
    return this.repository.save(values)
  }

  async update(
    item: AiInsight,
    values: Partial<AiInsight>,
  ): Promise<AiInsight> {
    const itemUpdated = { ...item, ...values }

    return this.repository.save(itemUpdated)
  }

  async delete(item: AiInsight): Promise<void> {
    await this.repository.softDelete(item.id)
  }

  async findMany(
    queryOptions: RequestHelper.QueryOptions<AiInsight> = {},
  ): Promise<AiInsight[]> {
    const query = this.databaseHelper.applyQueryOptions(
      this.repository,
      queryOptions,
    )

    return query.getMany()
  }

  async findOneByIdOrFail(
    id: string,
    queryOptions: RequestHelper.QueryOptions<AiInsight> = {},
  ): Promise<AiInsight> {
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
    queryOptions: RequestHelper.QueryOptions<AiInsight> = {},
  ): Promise<AiInsight[]> {
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
