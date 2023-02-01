import signinTmpl from './signin.tmpl'
import Button from '../../components/button'
import Input from '../../components/input'
import Block from '../../modules/block'
import { SigninProps } from './types'
import { jsonFromData, runValidation, validationFormData } from '../../utils/formUtils'
import ValidationError from '../../components/validationError'
import Label from '../../components/label'

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

const formInputLoginValidationError = new ValidationError(
  'span',
  {
    tagAttrs: {
      class: 'input-row__help',
    },
  }
)

const formInputPasswordValidationError = new ValidationError(
  'span',
  {
    tagAttrs: {
      class: 'input-row__help',
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
