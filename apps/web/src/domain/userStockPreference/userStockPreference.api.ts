import { HttpService } from '../../core/http'
import { ApiHelper } from '../helpers/api.helper'
import { UserStockPreference } from './userStockPreference.model'

export class UserStockPreferenceApi {
  static findMany(
    queryOptions?: ApiHelper.QueryOptions<UserStockPreference>,
  ): Promise<UserStockPreference[]> {
    const buildOptions = ApiHelper.buildQueryOptions(queryOptions)

    return HttpService.api.get(`/v1/userStockPreferences${buildOptions}`)
  }

  static findOne(
    userStockPreferenceId: string,
    queryOptions?: ApiHelper.QueryOptions<UserStockPreference>,
  ): Promise<UserStockPreference> {
    const buildOptions = ApiHelper.buildQueryOptions(queryOptions)

    return HttpService.api.get(
      `/v1/userStockPreferences/${userStockPreferenceId}${buildOptions}`,
    )
  }

  static createOne(
    values: Partial<UserStockPreference>,
  ): Promise<UserStockPreference> {
    return HttpService.api.post(`/v1/userStockPreferences`, values)
  }

  static updateOne(
    userStockPreferenceId: string,
    values: Partial<UserStockPreference>,
  ): Promise<UserStockPreference> {
    return HttpService.api.patch(
      `/v1/userStockPreferences/${userStockPreferenceId}`,
      values,
    )
  }

  static deleteOne(userStockPreferenceId: string): Promise<void> {
    return HttpService.api.delete(
      `/v1/userStockPreferences/${userStockPreferenceId}`,
    )
  }

  static findManyByUserId(
    userId: string,
    queryOptions?: ApiHelper.QueryOptions<UserStockPreference>,
  ): Promise<UserStockPreference[]> {
    const buildOptions = ApiHelper.buildQueryOptions(queryOptions)

    return HttpService.api.get(
      `/v1/users/user/${userId}/userStockPreferences${buildOptions}`,
    )
  }

  static createOneByUserId(
    userId: string,
    values: Partial<UserStockPreference>,
  ): Promise<UserStockPreference> {
    return HttpService.api.post(
      `/v1/users/user/${userId}/userStockPreferences`,
      values,
    )
  }

  static findManyByStockId(
    stockId: string,
    queryOptions?: ApiHelper.QueryOptions<UserStockPreference>,
  ): Promise<UserStockPreference[]> {
    const buildOptions = ApiHelper.buildQueryOptions(queryOptions)

    return HttpService.api.get(
      `/v1/stocks/stock/${stockId}/userStockPreferences${buildOptions}`,
    )
  }

  static createOneByStockId(
    stockId: string,
    values: Partial<UserStockPreference>,
  ): Promise<UserStockPreference> {
    return HttpService.api.post(
      `/v1/stocks/stock/${stockId}/userStockPreferences`,
      values,
    )
  }
}
