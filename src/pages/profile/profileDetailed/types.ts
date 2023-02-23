import Link from '../../../components/link'
import { TagAttribute, ComponentEvent } from '../../../modules/types'

export type ProfileDetailedProps = {
  tagAttrs?: TagAttribute
  linkBack: Link,
  linkChangeData: Link
  linkChangePassword: Link
  linkSignout: Link
  events?: ComponentEvent
}
