import signinTmpl from './signin.tmpl'
import Button from '../../components/button'
import Input from '../../components/input'
import Block from '../../modules/block'
import { SigninProps } from './types'
import { jsonFromData, runValidation, validationFormData } from '../../utils/formUtils'
import ValidationError from '../../components/validationError'
import Label from '../../components/label'
import Link from '../../components/link'
import Router from '../../modules/Router'

const acceptButton = new Button(
  'button',
  {
    tagAttrs: {
      class: 'button',
      type: 'submit',
    },
    text: 'войти',
  }
)

const signupLink = new Link(
  'a',
  {
    tagAttrs: {
      class: 'link',
      href: '/sign-up',
    },
    content: 'нет аккаунта?',
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

const attrs = {
  tagAttrs: {
    class: 'input-row__help input-row__help_signin-width',
  },
}

const formInputLoginValidationError = new ValidationError('span', attrs)
const formInputPasswordValidationError = new ValidationError('span', attrs)

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

class SigninPage extends Block {
  constructor(tagName: string, props: SigninProps) {
    if (!(props.formInputLogin && props.formInputPassword && props.acceptButton)) {
      throw new Error('SigninPage must have login/password fields and a button.')
    }

    super(tagName, props)
  }

  render() {
    return this.compile(signinTmpl)
  }
}

const signinHTML = new SigninPage('main', {
  tagAttrs: {
    class: 'form-box',
  },
  formInputLoginLabel,
  formInputLogin,
  formInputLoginValidationError,

  formInputPasswordLabel,
  formInputPassword,
  formInputPasswordValidationError,

  acceptButton,
  signupLink,
  events: {
    submit: (event: Event) => {
      event.preventDefault()

      const fields = [
        {
          field: formInputLogin,
          validation: formInputLoginValidationError,
        },
        {
          field: formInputPassword,
          validation: formInputPasswordValidationError,
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
})

export default signinHTML
