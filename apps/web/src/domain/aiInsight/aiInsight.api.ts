import { HttpService } from '../../core/http'
import { ApiHelper } from '../helpers/api.helper'
import { AiInsight } from './aiInsight.model'

export class AiInsightApi {
  static findMany(
    queryOptions?: ApiHelper.QueryOptions<AiInsight>,
  ): Promise<AiInsight[]> {
    const buildOptions = ApiHelper.buildQueryOptions(queryOptions)

    return HttpService.api.get(`/v1/aiInsights${buildOptions}`)
  }

  static findOne(
    aiInsightId: string,
    queryOptions?: ApiHelper.QueryOptions<AiInsight>,
  ): Promise<AiInsight> {
    const buildOptions = ApiHelper.buildQueryOptions(queryOptions)

    return HttpService.api.get(`/v1/aiInsights/${aiInsightId}${buildOptions}`)
  }

  static createOne(values: Partial<AiInsight>): Promise<AiInsight> {
    return HttpService.api.post(`/v1/aiInsights`, values)
  }

  static updateOne(
    aiInsightId: string,
    values: Partial<AiInsight>,
  ): Promise<AiInsight> {
    return HttpService.api.patch(`/v1/aiInsights/${aiInsightId}`, values)
  }

  static deleteOne(aiInsightId: string): Promise<void> {
    return HttpService.api.delete(`/v1/aiInsights/${aiInsightId}`)
  }

  static findManyByStockId(
    stockId: string,
    queryOptions?: ApiHelper.QueryOptions<AiInsight>,
  ): Promise<AiInsight[]> {
    const buildOptions = ApiHelper.buildQueryOptions(queryOptions)

    return HttpService.api.get(
      `/v1/stocks/stock/${stockId}/aiInsights${buildOptions}`,
    )
  }

  static createOneByStockId(
    stockId: string,
    values: Partial<AiInsight>,
  ): Promise<AiInsight> {
    return HttpService.api.post(
      `/v1/stocks/stock/${stockId}/aiInsights`,
      values,
    )
  }
}
