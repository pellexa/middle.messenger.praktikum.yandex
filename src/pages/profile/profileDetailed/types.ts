import Link from '../../../components/link'
import { TagAttribute, ComponentEvent } from '../../../modules/types'

export type ProfileDetailedProps = {
  tagAttrs?: TagAttribute
  apiResponseProfile: {
    id: number,
    first_name: string,
    second_name: string,
    display_name: string,
    login: string,
    email: string,
    phone: string,
    avatar: string,
  },
  linkBack: Link,
  linkChangeData: Link
  linkChangePassword: Link
  events?: ComponentEvent
}
