export namespace UserStockPreferenceApplicationEvent {
  export namespace UserStockPreferenceCreated {
    export const key =
      'userStockPreference.application.userStockPreference.created'

    export type Payload = {
      id: string
      userId: string
    }
  }
}
