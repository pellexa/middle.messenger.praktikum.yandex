import { TagAttribute, ComponentEvent } from '../../modules/types'

export type ChatListProps = {
  tagAttrs?: TagAttribute
  data: Array<{
    id: number
    title: string
    avatar: string
    unread_count: number
    last_message: {
      user: {
        first_name: string,
        second_name: string
        avatar: string
        email: string
        login: string
        phone: string
      },
      time: string
      content: string
    }
  }>
  events?: ComponentEvent
}
