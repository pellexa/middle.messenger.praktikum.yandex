import { TagAttribute, ComponentEvent } from '../../modules/types'
import Link from '../link'

export type ErrorProps = {
  tagAttrs?: TagAttribute
  error: {
    status: number,
    text: string,
  },
  linkBack: Link
  events?: ComponentEvent
}
