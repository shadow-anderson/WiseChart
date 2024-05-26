import { User } from '../user'

import { Stock } from '../stock'

export class UserStockPreference {
  id: string

  chartSettings?: string

  userId: string

  user?: User

  stockId: string

  stock?: Stock

  dateCreated: string

  dateDeleted: string

  dateUpdated: string
}
