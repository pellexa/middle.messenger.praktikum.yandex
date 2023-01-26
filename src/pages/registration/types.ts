import Button from '../../components/button'
import formInput from '../../components/formInput'
import { TagAttribute, ComponentEvent } from '../../modules/types'

export type RegistrationProps = {
  tagAttrs?: TagAttribute
  formInputEmail: formInput
  formInputLogin: formInput
  formInputFirstName: formInput
  formInputSecondName: formInput
  formInputPhone: formInput
  formInputPassword: formInput
  formInputPasswordAgain: formInput
  acceptButton: Button
  events?: ComponentEvent
}
