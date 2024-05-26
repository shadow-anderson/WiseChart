import { Stock } from '../stock'

export class AiInsight {
  id: string

  insightText: string

  predictionDate: string

  stockId: string

  stock?: Stock

  dateCreated: string

  dateDeleted: string

  dateUpdated: string
}
