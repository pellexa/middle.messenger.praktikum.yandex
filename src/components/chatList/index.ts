import Block from '../../modules/block'
import chatListTmpl from './chatList.tmpl'
import { ChatListProps } from './types'

export default class ChatList extends Block {
  constructor(tagName: string, props: ChatListProps) {
    super(tagName, props)
  }

  render() {
    return this.compile(chatListTmpl)
  }
}
