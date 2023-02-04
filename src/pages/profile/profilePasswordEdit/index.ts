import profilePasswordEditTmpl from './profilePasswordEdit.tmpl'
import IconBackSvg from '../../../components/icons/IconBack.svg'
import Button from '../../../components/button'
import { ProfilePasswordEditProps } from './types'
import Block from '../../../modules/block'
import Label from '../../../components/label'
import ValidationError from '../../../components/validationError'
import Input from '../../../components/input'
import { jsonFromData, runValidation, validationFormData } from '../../../utils/formUtils'

const formInputOldPasswordLabel = new Label(
  'label',
  {
    tagAttrs: {
      class: 'profile-key profile_margin-data profile__label',
      for: 'oldPassword',
    },
    text: 'Старый пароль',
  }
)

const formInputNewPasswordLabel = new Label(
  'label',
  {
    tagAttrs: {
      class: 'profile-key profile_margin-data profile__label',
      for: 'newPassword',
    },
    text: 'Новый пароль',
  }
)

const formInputNewPasswordAgainLabel = new Label(
  'label',
  {
    tagAttrs: {
      class: 'profile-key profile_margin-data profile__label',
      for: 'password_again',
    },
    text: 'Повторите новый пароль',
  }
)

const attrs = {
  tagAttrs: {
    class: 'input-row__help input-row__help_registartion-width',
  },
}

const formInputOldPasswordValidationError = new ValidationError('span', attrs)
const formInputNewPasswordValidationError = new ValidationError('span', attrs)
const formInputNewPasswordAgainValidationError = new ValidationError('span', attrs)

const formInputOldPassword = new Input(
  'input',
  {
    tagAttrs: {
      class: 'profile-value profile_margin-data profile__input',
      id: 'oldPassword',
      name: 'oldPassword',
      type: 'password',
    },
    events: {
      focus: () => {
        formInputOldPasswordValidationError.setProps({ error: null })
      },

      blur: (event: Event) => {
        const { value } = event.target as HTMLInputElement
        runValidation(
          'oldPassword',
          value,
          formInputOldPassword,
          formInputOldPasswordValidationError
        )
      },
    },
  }
)

const formInputNewPassword = new Input(
  'input',
  {
    tagAttrs: {
      class: 'profile-value profile_margin-data profile__input',
      id: 'newPassword',
      name: 'newPassword',
      type: 'password',
    },
    events: {
      focus: () => {
        formInputNewPasswordValidationError.setProps({ error: null })
      },

      blur: (event: Event) => {
        const { value } = event.target as HTMLInputElement
        runValidation(
          'newPassword',
          value,
          formInputNewPassword,
          formInputNewPasswordValidationError
        )
      },
    },
  }
)

const formInputNewPasswordAgain = new Input(
  'input',
  {
    tagAttrs: {
      class: 'profile-value profile_margin-data profile__input',
      id: 'newPasswordAgain',
      name: 'newPasswordAgain',
      type: 'password',
    },
    events: {
      focus: () => {
        formInputNewPasswordAgainValidationError.setProps({ error: null })
      },

      blur: (event: Event) => {
        const { value } = event.target as HTMLInputElement
        runValidation(
          'newPasswordAgain',
          value,
          formInputNewPasswordAgain,
          formInputNewPasswordAgainValidationError
        )
      },
    },
  }
)

const acceptButton = new Button(
  'button',
  {
    tagAttrs: {
      class: 'button',
      type: 'submit',
    },
    text: 'сохранить',
  }
)

class ProfilePasswordEdit extends Block {
  constructor(tagName: string, props: ProfilePasswordEditProps) {
    super(tagName, props)
  }

  render() {
    return this.compile(profilePasswordEditTmpl)
  }
}

const profilePasswordEditHTML = new ProfilePasswordEdit(
  'div',
  {
    tagAttrs: {
      class: 'profile',
    },
    apiResponseProfile: {
      id: 123,
      first_name: 'Petya',
      second_name: 'Pupkin',
      display_name: 'Petya Pupkin',
      login: 'userLogin',
      email: 'my@email.com',
      phone: '89223332211',
      avatar: '/path/to/avatar.jpg',
    },

    formInputOldPasswordLabel,
    formInputOldPassword,
    formInputOldPasswordValidationError,

    formInputNewPasswordLabel,
    formInputNewPassword,
    formInputNewPasswordValidationError,

    formInputNewPasswordAgainLabel,
    formInputNewPasswordAgain,
    formInputNewPasswordAgainValidationError,

    acceptButton,
    IconBack: IconBackSvg,

    events: {
      submit: (event: Event) => {
        event.preventDefault()

        const fields = [
          {
            field: formInputOldPassword,
            validation: formInputOldPasswordValidationError,
          },
          {
            field: formInputNewPassword,
            validation: formInputNewPasswordValidationError,
          },
          {
            field: formInputNewPasswordAgain,
            validation:formInputNewPasswordAgainValidationError,
          },
        ]

        const validationResults = validationFormData.call(event, fields)
        const result = Object.values(validationResults).every((value: boolean) => value === true)

        const json = jsonFromData.call(event, fields)
        console.log('json: ', json)

        if (result) {
          console.log('send api request')
        }
      },
    },
  }
)

export default profilePasswordEditHTML
