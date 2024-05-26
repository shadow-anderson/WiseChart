import { HttpService } from '../../core/http'
import { ApiHelper } from '../helpers/api.helper'
import { Stock } from './stock.model'

export class StockApi {
  static findMany(
    queryOptions?: ApiHelper.QueryOptions<Stock>,
  ): Promise<Stock[]> {
    const buildOptions = ApiHelper.buildQueryOptions(queryOptions)

    return HttpService.api.get(`/v1/stocks${buildOptions}`)
  }

  static findOne(
    stockId: string,
    queryOptions?: ApiHelper.QueryOptions<Stock>,
  ): Promise<Stock> {
    const buildOptions = ApiHelper.buildQueryOptions(queryOptions)

    return HttpService.api.get(`/v1/stocks/${stockId}${buildOptions}`)
  }

  static createOne(values: Partial<Stock>): Promise<Stock> {
    return HttpService.api.post(`/v1/stocks`, values)
  }

  static updateOne(stockId: string, values: Partial<Stock>): Promise<Stock> {
    return HttpService.api.patch(`/v1/stocks/${stockId}`, values)
  }

  static deleteOne(stockId: string): Promise<void> {
    return HttpService.api.delete(`/v1/stocks/${stockId}`)
  }
}
