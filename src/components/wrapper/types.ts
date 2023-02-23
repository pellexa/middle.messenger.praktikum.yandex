import { TagAttribute, ComponentEvent } from '../../modules/types'

export type wrapperProps = {
  tagAttrs?: TagAttribute
  content: unknown
  events?: ComponentEvent
}
