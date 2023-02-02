import Block from '../../modules/block'
import messageTmpl from './message.tmpl'
import { MessageProps } from './types'

export default class Message extends Block {
  constructor(tagName: string, props: MessageProps) {
    super(tagName, props)
  }

  render() {
    return this.compile(messageTmpl)
  }
}
