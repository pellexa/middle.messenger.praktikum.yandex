import { TagAttribute, ComponentEvent } from '../../modules/types'

export type ValidationErrorProps = {
  tagAttrs?: TagAttribute
  error?: string
  events?: ComponentEvent
}
