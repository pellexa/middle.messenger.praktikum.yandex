import Button from '../../components/button'
import formInput from '../../components/input'
import Label from '../../components/label'
import ValidationError from '../../components/validationError'
import { TagAttribute, ComponentEvent } from '../../modules/types'

export type RegistrationProps = {
  tagAttrs?: TagAttribute

  formInputEmailLabel: Label
  formInputEmail: formInput
  formInputEmailValidationError: ValidationError

  formInputLoginLabel: Label
  formInputLogin: formInput
  formInputLoginValidationError: ValidationError

  formInputFirstNameLabel: Label
  formInputFirstName: formInput
  formInputFirstNameValidationError: ValidationError

  formInputSecondNameLabel: Label
  formInputSecondName: formInput
  formInputSecondNameValidationError: ValidationError

  formInputPhoneLabel: Label
  formInputPhone: formInput
  formInputPhoneValidationError: ValidationError

  formInputPasswordLabel: Label
  formInputPassword: formInput
  formInputPasswordValidationError: ValidationError

  formInputPasswordAgainLabel: Label
  formInputPasswordAgain: formInput
  formInputPasswordAgainValidationError: ValidationError

  acceptButton: Button
  events?: ComponentEvent
}
