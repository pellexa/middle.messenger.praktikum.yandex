import Button from '../../../components/button'
import Input from '../../../components/input'
import Label from '../../../components/label'
import Link from '../../../components/link'
import ValidationError from '../../../components/validationError'
import { TagAttribute, ComponentEvent } from '../../../modules/types'

export type ProfilePasswordEditProps = {
  tagAttrs?: TagAttribute
  apiResponseProfile: {
    id: number
    first_name: string
    second_name: string
    display_name: string
    login: string
    email: string
    phone: string
    avatar: string
  }

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
