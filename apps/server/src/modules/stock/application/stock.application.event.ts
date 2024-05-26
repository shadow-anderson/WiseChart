export namespace StockApplicationEvent {
  export namespace StockCreated {
    export const key = 'stock.application.stock.created'

    export type Payload = {
      id: string
      userId: string
    }
  }
}
