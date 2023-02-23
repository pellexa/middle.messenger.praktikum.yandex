import Button from '../../../components/button'
import Input from '../../../components/input'
import Label from '../../../components/label'
import Link from '../../../components/link'
import ValidationError from '../../../components/validationError'
import { TagAttribute, ComponentEvent } from '../../../modules/types'
import ProfileUploadAvatar from '../profileUploadAvatar'

export type ProfileEditProps = {
  tagAttrs?: TagAttribute

  formInputEmailLabel: Label
  formInputEmail: Input
  formInputEmailValidationError: ValidationError

  formInputLoginLabel: Label
  formInputLoginValidationError: ValidationError
  formInputLogin: Input

  formInputFirstNameLabel: Label
  formInputFirstNameValidationError: ValidationError
  formInputFirstName: Input

  formInputSecondNameLabel: Label
  formInputSecondNameValidationError: ValidationError
  formInputSecondName: Input

  formInputDisplayNameLabel: Label
  formInputDisplayNameValidationError: ValidationError
  formInputDisplayName: Input

  formInputPhoneLabel: Label
  formInputPhoneValidationError: ValidationError
  formInputPhone: Input

  linkBack: Link
  acceptButton: Button
  profileUploadAvatar: ProfileUploadAvatar
  events?: ComponentEvent
}
