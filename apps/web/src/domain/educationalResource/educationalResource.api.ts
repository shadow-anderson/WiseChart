import { HttpService } from '../../core/http'
import { ApiHelper } from '../helpers/api.helper'
import { EducationalResource } from './educationalResource.model'

export class EducationalResourceApi {
  static findMany(
    queryOptions?: ApiHelper.QueryOptions<EducationalResource>,
  ): Promise<EducationalResource[]> {
    const buildOptions = ApiHelper.buildQueryOptions(queryOptions)

    return HttpService.api.get(`/v1/educationalResources${buildOptions}`)
  }

  static findOne(
    educationalResourceId: string,
    queryOptions?: ApiHelper.QueryOptions<EducationalResource>,
  ): Promise<EducationalResource> {
    const buildOptions = ApiHelper.buildQueryOptions(queryOptions)

    return HttpService.api.get(
      `/v1/educationalResources/${educationalResourceId}${buildOptions}`,
    )
  }

  static createOne(
    values: Partial<EducationalResource>,
  ): Promise<EducationalResource> {
    return HttpService.api.post(`/v1/educationalResources`, values)
  }

  static updateOne(
    educationalResourceId: string,
    values: Partial<EducationalResource>,
  ): Promise<EducationalResource> {
    return HttpService.api.patch(
      `/v1/educationalResources/${educationalResourceId}`,
      values,
    )
  }

  static deleteOne(educationalResourceId: string): Promise<void> {
    return HttpService.api.delete(
      `/v1/educationalResources/${educationalResourceId}`,
    )
  }
}
