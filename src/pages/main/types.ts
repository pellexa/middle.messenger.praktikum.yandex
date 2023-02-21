import ChatList from '../../components/chatList'
import MenuDotHeader from '../../components/menuDotHeader'
import MessageList from '../../components/messageList'
import Modal from '../../components/modal'
import Search from '../../components/search'
import ValidationError from '../../components/validationError'
import Wrapper from '../../components/wrapper'
import { TagAttribute, ComponentEvent } from '../../modules/types'

export type MainProps = {
  tagAttrs?: TagAttribute
  linkProfileWrapper: Wrapper
  inputSearch: Search
  chatModal: Modal
  chatList: InstanceType<typeof ChatList>
  messages: InstanceType<typeof MessageList>
  formInputMessageValidationError: ValidationError
  formMessage: Wrapper
  menuDotHeader: InstanceType<typeof MenuDotHeader>
  events?: ComponentEvent
}
