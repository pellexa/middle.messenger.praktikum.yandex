import { TagAttribute, ComponentEvent } from '../../modules/types'
import Time from '../time'

export type MessageProps = {
  tagAttrs?: TagAttribute
  time: Time | null
  isImage: boolean
  msg: {
    time: string
    content: string | { image: string }
    is_my: boolean
  }
  isMy: boolean
  events?: ComponentEvent
}
