import { Stock } from '../stock'

export class StockData {
  id: string

  date: string

  openPrice: number

  closePrice: number

  highPrice: number

  lowPrice: number

  volume: string

  stockId: string

  stock?: Stock

  dateCreated: string

  dateDeleted: string

  dateUpdated: string
}
