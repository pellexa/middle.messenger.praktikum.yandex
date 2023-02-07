import { TagAttribute, ComponentEvent } from '../../modules/types'
import Link from '../link'

export type NavProps = {
  tagAttrs?: TagAttribute
  navList: Link[]
  events?: ComponentEvent
}
