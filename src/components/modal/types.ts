import { TagAttribute, ComponentEvent } from '../../modules/types'
import Wrapper from '../wrapper'

export type modalProps = {
  tagAttrs?: TagAttribute
  title?: string
  form: Wrapper
  events?: ComponentEvent
}
