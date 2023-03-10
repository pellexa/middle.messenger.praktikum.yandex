import { User } from '../../api/auth-api'
import { Chat } from '../../controllers/chat'
import { Message } from '../../controllers/webSocketMessage'
import EventBus from '../../modules/eventBus'
import { set } from '../../utils/helpers'

export type State = {
  auth?: {
    user: User
  },
  chats?: {
    activeChatUsers: User[] | null
    list: Chat[] | null
    alreadyAddedUsers: User[]
    webSocketToken: string
    prevActiveChatId: string
    activeChatId: string
    [key: number]: {
      messages: Message[]
      countNewMessages: number
    }
  }
  search?: {
    users: User[] | null
  }
}

export enum StoreEvents {
  UPDATED = 'store:updated',
}

export default class Store extends EventBus {
  public state: State = {}

  constructor() {
    super()
  }

  public getState() {
    return this.state
  }

  public set(path: string, value: unknown) {
    // Without setting null, the state is equal to the newState in the connect funciton.
    // For example, the list of chats will not be re-rendered during creation.
    set(this.state, path, null)
    set(this.state, path, value)
    this.emit(StoreEvents.UPDATED)
  }
}
