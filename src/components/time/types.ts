import { TagAttribute, ComponentEvent } from '../../modules/types'

export type TimeProps = {
  tagAttrs?: TagAttribute
  date: string | null
  events?: ComponentEvent
}
