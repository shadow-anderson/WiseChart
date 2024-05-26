export namespace AlertApplicationEvent {
  export namespace AlertCreated {
    export const key = 'alert.application.alert.created'

    export type Payload = {
      id: string
      userId: string
    }
  }
}
