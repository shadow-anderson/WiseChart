export namespace EducationalResourceApplicationEvent {
  export namespace EducationalResourceCreated {
    export const key =
      'educationalResource.application.educationalResource.created'

    export type Payload = {
      id: string
      userId: string
    }
  }
}
