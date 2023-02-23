import Button from '../../components/button'
import formInput from '../../components/input'
import Label from '../../components/label'
import Link from '../../components/link'
import ValidationError from '../../components/validationError'
import { TagAttribute, ComponentEvent } from '../../modules/types'

export type SigninProps = {
  tagAttrs?: TagAttribute
  formInputLoginLabel: Label
  formInputLogin: formInput
  formInputLoginValidationError: ValidationError
  formInputPasswordLabel: Label
  formInputPassword: formInput
  formInputPasswordValidationError: ValidationError
  acceptButton: Button
  signupLink: Link
  events?: ComponentEvent
}
