import { TagAttribute, ComponentEvent } from '../../modules/types'
import Button from '../button'

export type ChatListProps = {
  tagAttrs?: TagAttribute
  chatButtonShowModal: Button
  events?: ComponentEvent
}
