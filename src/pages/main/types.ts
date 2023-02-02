import Button from '../../components/button'
import ChatList from '../../components/chatList'
import Input from '../../components/input'
import Label from '../../components/label'
import MenuDotHeader from '../../components/menuDotHeader'
import Message from '../../components/message'
import Search from '../../components/search'
import ValidationError from '../../components/validationError'
import { TagAttribute, ComponentEvent } from '../../modules/types'

export type MainProps = {
  tagAttrs?: TagAttribute
  inputSearch: Search
  chatList: ChatList
  selectedChat: {} | boolean
  messages: Array<Message>
  formInputFileLabel: Label
  formInputFile: Input
  formInputMessage: Input
  formInputMessageValidationError: ValidationError
  sendButton: Button
  menuDotHeader: MenuDotHeader
  events?: ComponentEvent
}
