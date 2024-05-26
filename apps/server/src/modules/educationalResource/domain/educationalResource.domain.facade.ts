import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { DatabaseHelper } from '../../../core/database'
import { RequestHelper } from '../../../helpers/request'
import { EducationalResource } from './educationalResource.model'

@Injectable()
export class EducationalResourceDomainFacade {
  constructor(
    @InjectRepository(EducationalResource)
    private repository: Repository<EducationalResource>,
    private databaseHelper: DatabaseHelper,
  ) {}

  async create(
    values: Partial<EducationalResource>,
  ): Promise<EducationalResource> {
    return this.repository.save(values)
  }

  async update(
    item: EducationalResource,
    values: Partial<EducationalResource>,
  ): Promise<EducationalResource> {
    const itemUpdated = { ...item, ...values }

    return this.repository.save(itemUpdated)
  }

  async delete(item: EducationalResource): Promise<void> {
    await this.repository.softDelete(item.id)
  }

  async findMany(
    queryOptions: RequestHelper.QueryOptions<EducationalResource> = {},
  ): Promise<EducationalResource[]> {
    const query = this.databaseHelper.applyQueryOptions(
      this.repository,
      queryOptions,
    )

    return query.getMany()
  }

  async findOneByIdOrFail(
    id: string,
    queryOptions: RequestHelper.QueryOptions<EducationalResource> = {},
  ): Promise<EducationalResource> {
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
}
