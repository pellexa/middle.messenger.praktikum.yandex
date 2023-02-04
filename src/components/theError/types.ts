import { TagAttribute, ComponentEvent } from '../../modules/types'

export type ErrorProps = {
  tagAttrs?: TagAttribute
  error: {
    status: number,
    text: string,
    back: {
      link: string,
      text: string,
    },
  },
  events?: ComponentEvent
}
