import Block from '../../modules/block'
import connect from '../../servises/store/connect'
import { State } from '../../servises/store/store'
import { isEqual } from '../../utils/helpers'
import messageListTmpl from './messageList.tmpl'
import { MessageListProps } from './types'

class MessageList extends Block {
  constructor(tagName: string, props: MessageListProps) {
    super(tagName, props)
  }

  public componentDidUpdate(oldProps: any, newProps: any): boolean {
    const result = !isEqual(oldProps ?? {} , newProps ?? {})

    if (result) {
      setTimeout(() => this.element.scrollTop = this.element.scrollHeight)
    }

    return result
  }

  render() {
    return this.compile(messageListTmpl)
  }
}

function mapChatListToProps(state: State) {
  const activeChatId = state.chats?.activeChatId

  if (activeChatId) {
    return {
      activeChatId,
      data: state.chats[activeChatId]?.messages,
    }
  }

  return {
    activeChatId,
  }
}

export default connect<typeof MessageList>(mapChatListToProps)(MessageList)
