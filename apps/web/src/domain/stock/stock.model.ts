import { StockData } from '../stockData'

import { UserStockPreference } from '../userStockPreference'

import { Alert } from '../alert'

import { AiInsight } from '../aiInsight'

export class Stock {
  id: string

  symbol: string

  name: string

  sector?: string

  industry?: string

  dateCreated: string

  dateDeleted: string

  dateUpdated: string

  stockDatas?: StockData[]

  userStockPreferences?: UserStockPreference[]

  alerts?: Alert[]

  aiInsights?: AiInsight[]
}
