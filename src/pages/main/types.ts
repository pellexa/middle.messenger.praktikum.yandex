import ChatList from '../../components/chatList'
import MenuDotHeader from '../../components/menuDotHeader'
import Message from '../../components/message'
import Modal from '../../components/modal'
import Search from '../../components/search'
import ValidationError from '../../components/validationError'
import Wrapper from '../../components/wrapper'
import { TagAttribute, ComponentEvent } from '../../modules/types'

export type MainProps = {
  tagAttrs?: TagAttribute
  inputSearch: Search
  chatModal: Modal
  chatList: InstanceType<typeof ChatList>
  messages: Array<Message>
  formInputMessageValidationError: ValidationError
  formMessage: Wrapper
  menuDotHeader: InstanceType<typeof MenuDotHeader>
  events?: ComponentEvent
}
