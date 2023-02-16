import registrationTmpl from './registration.tmpl'
import { RegistrationProps } from './types'
import Block from '../../modules/block'
import Input from '../../components/input'
import Button from '../../components/button'
import Label from '../../components/label'
import ValidationError from '../../components/validationError'
import { runValidation } from '../../utils/formUtils'
import AuthController from '../../controllers/auth'
import Link from '../../components/link'
import Router from '../../modules/Router'

const formInputEmailLabel = new Label(
  'label',
  {
    tagAttrs: {
      class: 'input-row__label input-row__label_displayed',
      for: 'email',
    },
    text: 'Почта',
  }
)

const formInputLoginLabel = new Label(
  'label',
  {
    tagAttrs: {
      class: 'input-row__label input-row__label_displayed',
      for: 'login',
    },
    text: 'Логин',
  }
)

const formInputFirstNameLabel = new Label(
  'label',
  {
    tagAttrs: {
      class: 'input-row__label input-row__label_displayed',
      for: 'first_name',
    },
    text: 'Имя',
  }
)

const formInputSecondNameLabel = new Label(
  'label',
  {
    tagAttrs: {
      class: 'input-row__label input-row__label_displayed',
      for: 'second_name',
    },
    text: 'Фамилия',
  }
)

const formInputPhoneLabel = new Label(
  'label',
  {
    tagAttrs: {
      class: 'input-row__label input-row__label_displayed',
      for: 'phone',
    },
    text: 'Телефон',
  }
)

const formInputPasswordLabel = new Label(
  'label',
  {
    tagAttrs: {
      class: 'input-row__label input-row__label_displayed',
      for: 'password',
    },
    text: 'Пароль',
  }
)

const formInputPasswordAgainLabel = new Label(
  'label',
  {
    tagAttrs: {
      class: 'input-row__label input-row__label_displayed',
      for: 'password_again',
    },
    text: 'Пароль (ущё раз)',
  }
)

const attrs = {
  tagAttrs: {
    class: 'input-row__help input-row__help_registartion-width',
  },
}

const formInputEmailValidationError = new ValidationError('span', attrs)
const formInputLoginValidationError = new ValidationError('span', attrs)
const formInputFirstNameValidationError = new ValidationError('span', attrs)
const formInputSecondNameValidationError = new ValidationError('span', attrs)
const formInputPasswordValidationError = new ValidationError('span', attrs)
const formInputPasswordAgainValidationError = new ValidationError('span', attrs)
const formInputPhoneValidationError = new ValidationError('span', attrs)

const formInputEmail = new Input(
  'input',
  {
    tagAttrs: {
      class: 'input-row__field',
      id: 'email',
      name: 'email',
      type: 'text',
      placeholder: 'Почта',
    },
    events: {
      focus: () => {
        formInputEmailValidationError.setProps({ error: null })
      },

      blur: (event: Event) => {
        const { value } = event.target as HTMLInputElement
        runValidation('email', value, formInputEmail, formInputEmailValidationError)
      },
    },
  }
)

const formInputLogin = new Input(
  'input',
  {
    tagAttrs: {
      class: 'input-row__field',
      id: 'login',
      name: 'login',
      type: 'text',
      placeholder: 'Логин',
    },
    events: {
      focus: () => {
        formInputLoginValidationError.setProps({ error: null })
      },

      blur: (event: Event) => {
        const { value } = event.target as HTMLInputElement
        runValidation('login', value, formInputLogin, formInputLoginValidationError)
      },
    },
  }
)

const formInputFirstName = new Input(
  'input',
  {
    tagAttrs: {
      class: 'input-row__field',
      id: 'first_name',
      name: 'first_name',
      type: 'text',
      placeholder: 'Имя',
    },
    events: {
      focus: () => {
        formInputFirstNameValidationError.setProps({ error: null })
      },

      blur: (event: Event) => {
        const { value } = event.target as HTMLInputElement
        runValidation('first_name', value, formInputFirstName, formInputFirstNameValidationError)
      },
    },
  }
)

const formInputSecondName = new Input(
  'input',
  {
    tagAttrs: {
      class: 'input-row__field',
      id: 'second_name',
      name: 'second_name',
      type: 'text',
      placeholder: 'Фамилия',
    },
    events: {
      focus: () => {
        formInputSecondNameValidationError.setProps({ error: null })
      },

      blur: (event: Event) => {
        const { value } = event.target as HTMLInputElement
        runValidation('second_name', value, formInputSecondName, formInputSecondNameValidationError)
      },
    },
  }
)

const formInputPhone = new Input(
  'input',
  {
    tagAttrs: {
      class: 'input-row__field',
      id: 'phone',
      name: 'phone',
      type: 'text',
      placeholder: 'Телефон',
    },
    events: {
      focus: () => {
        formInputPhoneValidationError.setProps({ error: null })
      },

      blur: (event: Event) => {
        const { value } = event.target as HTMLInputElement
        runValidation('phone', value, formInputPhone, formInputPhoneValidationError)
      },
    },
  }
)

const formInputPassword = new Input(
  'input',
  {
    tagAttrs: {
      class: 'input-row__field',
      id: 'password',
      name: 'password',
      type: 'password',
      placeholder: 'Пароль',
    },
    events: {
      focus: () => {
        formInputPasswordValidationError.setProps({ error: null })
      },

      blur: (event: Event) => {
        const { value } = event.target as HTMLInputElement
        runValidation('password', value, formInputPassword, formInputPasswordValidationError)
      },
    },
  }
)

const formInputPasswordAgain = new Input(
  'input',
  {
    tagAttrs: {
      class: 'input-row__field',
      id: 'password_again',
      name: 'password_again',
      type: 'password',
      placeholder: 'Пароль  (ещё раз)',
    },
    events: {
      focus: () => {
        formInputPasswordAgainValidationError.setProps({ error: null })
      },

      blur: (event: Event) => {
        const { value } = event.target as HTMLInputElement
        runValidation(
          'password_again',
          value,
          formInputPasswordAgain,
          formInputPasswordAgainValidationError
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
    text: 'зарегистрироваться',
  }
)

const linkSignin = new Link(
  'a',
  {
    tagAttrs: {
      href: '/',
      class: 'link',
    },
    content: 'войти',
    events: {
      click: (event: Event) => {
        event.preventDefault()

        const element = event.target as HTMLLinkElement
        const router = Router.getInstance()
        const uri = element.getAttribute('href')

        if (!uri) {
          throw new Error('The href attribute must exist on the "a" tag.')
        }

        router.go(uri)
      },
    },
  }
)

class RegistrationPage extends Block {
  constructor(tagName: string, props: RegistrationProps) {
    if (!(props.formInputEmail
          && props.formInputLogin
          && props.formInputFirstName
          && props.formInputSecondName
          && props.formInputPhone
          && props.formInputPassword
          && props.formInputPasswordAgain
          && props.acceptButton)) {
      throw new Error('RegistrationPage must have general fields and a button.')
    }

    super(tagName, props)
  }

  render() {
    return this.compile(registrationTmpl)
  }
}

const registration = new RegistrationPage('main', {
  tagAttrs: {
    class: 'form-box',
  },
  formInputEmailLabel,
  formInputEmail,
  formInputEmailValidationError,

  formInputLoginLabel,
  formInputLogin,
  formInputLoginValidationError,

  formInputFirstNameLabel,
  formInputFirstName,
  formInputFirstNameValidationError,

  formInputSecondNameLabel,
  formInputSecondName,
  formInputSecondNameValidationError,

  formInputPhoneLabel,
  formInputPhone,
  formInputPhoneValidationError,

  formInputPasswordLabel,
  formInputPassword,
  formInputPasswordValidationError,

  formInputPasswordAgainLabel,
  formInputPasswordAgain,
  formInputPasswordAgainValidationError,

  acceptButton,
  linkSignin,
  events: {
    submit: (event: Event) => {
      event.preventDefault()

      const fields = [
        {
          field: formInputEmail,
          validation: formInputEmailValidationError,
        },
        {
          field: formInputLogin,
          validation: formInputLoginValidationError,
        },
        {
          field: formInputFirstName,
          validation: formInputFirstNameValidationError,
        },
        {
          field: formInputSecondName,
          validation: formInputSecondNameValidationError,
        },
        {
          field: formInputPhone,
          validation: formInputPhoneValidationError,
        },
        {
          field: formInputPassword,
          validation: formInputPasswordValidationError,
        },
        {
          field: formInputPasswordAgain,
          validation: formInputPasswordAgainValidationError,
        },
      ]

      const authController = new AuthController(event, fields)
      authController.signup()
    },
  },
})

export default registration
