import Button from '../../../components/button'
import Input from '../../../components/input'
import Label from '../../../components/label'
import Link from '../../../components/link'
import ValidationError from '../../../components/validationError'
import { TagAttribute, ComponentEvent } from '../../../modules/types'

export type ProfilePasswordEditProps = {
  tagAttrs?: TagAttribute

  formInputOldPasswordLabel: Label
  formInputOldPassword: Input
  formInputOldPasswordValidationError: ValidationError

  formInputNewPasswordLabel: Label
  formInputNewPassword: Input
  formInputNewPasswordValidationError: ValidationError

  formInputNewPasswordAgainLabel: Label
  formInputNewPasswordAgain: Input
  formInputNewPasswordAgainValidationError: ValidationError

  acceptButton: Button
  linkBack: Link
  events?: ComponentEvent
}
