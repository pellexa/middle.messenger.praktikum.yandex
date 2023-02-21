import ChatController from '../../controllers/chat'
import Block from '../../modules/block'
import connect from '../../servises/store/connect'
import { State } from '../../servises/store/store'
import { isEqual } from '../../utils/helpers'
import chatListTmpl from './chatList.tmpl'
import { ChatListProps } from './types'

class ChatList extends Block {
  constructor(tagName: string, props: ChatListProps) {
    super(tagName, props)
  }

  public componentDidMount(): void {
    this.getChatList()
  }

  public getChatList() {
    const chatController = new ChatController()
    chatController.getChats()
  }

  public componentDidUpdate(oldProps: unknown, newProps: unknown): boolean {
    return !isEqual(oldProps ?? {} , newProps ?? {})
  }

  render() {
    return this.compile(chatListTmpl)
  }
}

function mapChatListToProps(state: State) {
  return {
    data: state.chats?.list,
  }
}

export default connect<typeof ChatList>(mapChatListToProps)(ChatList)
