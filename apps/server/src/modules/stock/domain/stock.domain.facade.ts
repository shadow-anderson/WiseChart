import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { DatabaseHelper } from '../../../core/database'
import { RequestHelper } from '../../../helpers/request'
import { Stock } from './stock.model'
import { StockService } from '../../../modules/stock/application/stock.service'

@Injectable()
export class StockDomainFacade {
  constructor(
    @InjectRepository(Stock)
    private repository: Repository<Stock>,
    private databaseHelper: DatabaseHelper,
    private stockService: StockService,
  ) {}

  async create(values: Partial<Stock>): Promise<Stock> {
    return this.repository.save(values)
  }

  async update(item: Stock, values: Partial<Stock>): Promise<Stock> {
    const itemUpdated = { ...item, ...values }

    return this.repository.save(itemUpdated)
  }

  async delete(item: Stock): Promise<void> {
    await this.repository.softDelete(item.id)
  }

  async findMany(
    queryOptions: RequestHelper.QueryOptions<Stock> = {},
  ): Promise<Stock[]> {
    const query = this.databaseHelper.applyQueryOptions(
      this.repository,
      queryOptions,
    )

    return query.getMany()
  }

  async findOneByIdOrFail(
    id: string,
    queryOptions: RequestHelper.QueryOptions<Stock> = {},
  ): Promise<Stock> {
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

  async getStockChartData(stockId: string): Promise<any> {
    return this.stockService.fetchStockChartData(stockId)
  }
}
