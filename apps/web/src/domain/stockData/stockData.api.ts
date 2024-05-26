import { HttpService } from '../../core/http'
import { ApiHelper } from '../helpers/api.helper'
import { StockData } from './stockData.model'

export class StockDataApi {
  static findMany(
    queryOptions?: ApiHelper.QueryOptions<StockData>,
  ): Promise<StockData[]> {
    const buildOptions = ApiHelper.buildQueryOptions(queryOptions)

    return HttpService.api.get(`/v1/stockDatas${buildOptions}`)
  }

  static findOne(
    stockDataId: string,
    queryOptions?: ApiHelper.QueryOptions<StockData>,
  ): Promise<StockData> {
    const buildOptions = ApiHelper.buildQueryOptions(queryOptions)

    return HttpService.api.get(`/v1/stockDatas/${stockDataId}${buildOptions}`)
  }

  static createOne(values: Partial<StockData>): Promise<StockData> {
    return HttpService.api.post(`/v1/stockDatas`, values)
  }

  static updateOne(
    stockDataId: string,
    values: Partial<StockData>,
  ): Promise<StockData> {
    return HttpService.api.patch(`/v1/stockDatas/${stockDataId}`, values)
  }

  static deleteOne(stockDataId: string): Promise<void> {
    return HttpService.api.delete(`/v1/stockDatas/${stockDataId}`)
  }

  static findManyByStockId(
    stockId: string,
    queryOptions?: ApiHelper.QueryOptions<StockData>,
  ): Promise<StockData[]> {
    const buildOptions = ApiHelper.buildQueryOptions(queryOptions)

    return HttpService.api.get(
      `/v1/stocks/stock/${stockId}/stockDatas${buildOptions}`,
    )
  }

  static createOneByStockId(
    stockId: string,
    values: Partial<StockData>,
  ): Promise<StockData> {
    return HttpService.api.post(
      `/v1/stocks/stock/${stockId}/stockDatas`,
      values,
    )
  }
}
