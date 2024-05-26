import { AiApi } from './ai/ai.api'
import { AuthenticationApi } from './authentication/authentication.api'
import { AuthorizationApi } from './authorization/authorization.api'
import { BillingApi } from './billing/billing.api'
import { UploadApi } from './upload/upload.api'

import { UserApi } from './user/user.api'

import { NotificationApi } from './notification/notification.api'

import { StockApi } from './stock/stock.api'

import { StockDataApi } from './stockData/stockData.api'

import { UserStockPreferenceApi } from './userStockPreference/userStockPreference.api'

import { AlertApi } from './alert/alert.api'

import { AiInsightApi } from './aiInsight/aiInsight.api'

import { EducationalResourceApi } from './educationalResource/educationalResource.api'

export namespace Api {
  export class Ai extends AiApi {}
  export class Authentication extends AuthenticationApi {}
  export class Authorization extends AuthorizationApi {}
  export class Billing extends BillingApi {}
  export class Upload extends UploadApi {}

  export class User extends UserApi {}

  export class Notification extends NotificationApi {}

  export class Stock extends StockApi {}

  export class StockData extends StockDataApi {}

  export class UserStockPreference extends UserStockPreferenceApi {}

  export class Alert extends AlertApi {}

  export class AiInsight extends AiInsightApi {}

  export class EducationalResource extends EducationalResourceApi {}
}
