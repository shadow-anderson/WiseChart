import { AuthorizationRole as AuthorizationRoleModel } from './authorization/authorization.model'
import {
  BillingPayment as BillingPaymentModel,
  BillingProduct as BillingProductModel,
  BillingSubscription as BillingSubscriptionModel,
} from './billing/billing.model'

import { User as UserModel } from './user/user.model'

import { Notification as NotificationModel } from './notification/notification.model'

import { Stock as StockModel } from './stock/stock.model'

import { StockData as StockDataModel } from './stockData/stockData.model'

import { UserStockPreference as UserStockPreferenceModel } from './userStockPreference/userStockPreference.model'

import { Alert as AlertModel } from './alert/alert.model'

import { AiInsight as AiInsightModel } from './aiInsight/aiInsight.model'

import { EducationalResource as EducationalResourceModel } from './educationalResource/educationalResource.model'

export namespace Model {
  export class AuthorizationRole extends AuthorizationRoleModel {}
  export class BillingProduct extends BillingProductModel {}
  export class BillingPayment extends BillingPaymentModel {}
  export class BillingSubscription extends BillingSubscriptionModel {}

  export class User extends UserModel {}

  export class Notification extends NotificationModel {}

  export class Stock extends StockModel {}

  export class StockData extends StockDataModel {}

  export class UserStockPreference extends UserStockPreferenceModel {}

  export class Alert extends AlertModel {}

  export class AiInsight extends AiInsightModel {}

  export class EducationalResource extends EducationalResourceModel {}
}
