import { TagAttribute, ComponentEvent } from '../../modules/types'
import SearchUserList from '../searchUserList'
import ValidationError from '../validationError'
import Wrapper from '../wrapper'

export type SearchProps = {
  tagAttrs?: TagAttribute
  searchInputValidationError: ValidationError
  searchWrapperInput: Wrapper
  searchUserList: InstanceType<typeof SearchUserList>
  events?: ComponentEvent
}
