import ChatController from '../../controllers/chat'
import Block from '../../modules/block'
import store from '../../servises/store'
import { StoreEvents } from '../../servises/store/store'
import { isEqual } from '../../utils/helpers'
import chatListTmpl from './chatList.tmpl'
import { ChatListProps } from './types'

export default class ChatList extends Block {
  constructor(tagName: string, props: ChatListProps) {
    super(tagName, props)

    store.on(StoreEvents.UPDATED, () => {
      const newState = store.getState()
      this.setProps({ data: newState.chats ? newState.chats.list : '' })
    })
  }

  public componentDidMount(): void {
    if (store.getState().auth) {
      this.getChatList()
    }
  }

  public getChatList() {
    const chatController = new ChatController()
    chatController.getChats()
  }

  public componentDidUpdate(oldProps: any, newProps: any): boolean {
    const result = !isEqual(oldProps ?? {} , newProps ?? {})
    return result
  }

  render() {
    return this.compile(chatListTmpl)
  }
}
