import Button from '../../components/button'
import formInput from '../../components/formInput'
import { TagAttribute, ComponentEvent } from '../../modules/types'

export type SigninProps = {
  tagAttrs?: TagAttribute
  formInputLogin: formInput
  formInputPassword: formInput
  acceptButton: Button
  events?: ComponentEvent
}
