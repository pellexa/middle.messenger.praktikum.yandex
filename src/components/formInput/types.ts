import { TagAttribute, ComponentEvent } from '../../modules/types'

export type InputProps = {
  tagAttrs?: TagAttribute
  input: {
    id: string
    name: string
    type: string
    label: {
      value: string
    }
    validationErrors?: []
  }
  events?: ComponentEvent
}
