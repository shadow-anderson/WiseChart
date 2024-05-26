export namespace StockDataApplicationEvent {
  export namespace StockDataCreated {
    export const key = 'stockData.application.stockData.created'

    export type Payload = {
      id: string
      userId: string
    }
  }
}
