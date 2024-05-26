export namespace AiInsightApplicationEvent {
  export namespace AiInsightCreated {
    export const key = 'aiInsight.application.aiInsight.created'

    export type Payload = {
      id: string
      userId: string
    }
  }
}
