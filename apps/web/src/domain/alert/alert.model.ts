import { User } from '../user'

import { Stock } from '../stock'

export class Alert {
  id: string

  criteria: string

  notificationMethod: string

  userId: string

  user?: User

  stockId: string

  stock?: Stock

  dateCreated: string

  dateDeleted: string

  dateUpdated: string
}
