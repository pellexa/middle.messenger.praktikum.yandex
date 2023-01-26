import registrationTmpl from './registration.tmpl'
import { RegistrationProps } from './types'
import Block from '../../modules/block'
import Input from '../../components/formInput'
import Button from '../../components/button'

const formInputEmail = new Input(
  'div',
  {
    tagAttrs: {
      class: 'input-row',
    },
    input: {
      id: 'email',
      name: 'email',
      type: 'email',
      label: {
        value: 'Почта',
      },
      // validationErrors: {
      //     error: 'Some validation error...'
      // }
    },
  },
)

const formInputLogin = new Input(
  'div',
  {
    tagAttrs: {
      class: 'input-row',
    },
    input: {
      id: 'login',
      name: 'login',
      type: 'text',
      label: {
        value: 'Логин',
      },
    },
  },
)

const formInputFirstName = new Input(
  'div',
  {
    tagAttrs: {
      class: 'input-row',
    },
    input: {
      id: 'first_name',
      name: 'first_name',
      type: 'text',
      label: {
        value: 'Имя',
      },
    },
  },
)

const formInputSecondName = new Input(
  'div',
  {
    tagAttrs: {
      class: 'input-row',
    },
    input: {
      id: 'second_name',
      name: 'second_name',
      type: 'text',
      label: {
        value: 'Фамилия',
      },
    },
  },
)

const formInputPhone = new Input(
  'div',
  {
    tagAttrs: {
      class: 'input-row',
    },
    input: {
      id: 'phone',
      name: 'phone',
      type: 'text',
      label: {
        value: 'Телефон',
      },
    },
  },
)

const formInputPassword = new Input(
  'div',
  {
    tagAttrs: {
      class: 'input-row',
    },
    input: {
      id: 'password',
      name: 'password',
      type: 'password',
      label: {
        value: 'Пароль',
      },
    },
  },
)

const formInputPasswordAgain = new Input(
  'div',
  {
    tagAttrs: {
      class: 'input-row',
    },
    input: {
      id: 'password_again',
      name: 'password_again',
      type: 'password',
      label: {
        value: 'Пароль (ещё раз)',
      },
    },
  },
)

const acceptButton = new Button(
  'button',
  {
    tagAttrs: {
      class: 'button',
      type: 'submit',
    },
    text: 'зарегистрироваться',
    events: {
      click: (event: Event) => {
        event.preventDefault()
        console.log('Button registration event: ', event)
      },
    },
  },
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

const registrationHTML = new RegistrationPage('main', {
  tagAttrs: {
    class: 'form-box',
  },
  formInputEmail,
  formInputLogin,
  formInputFirstName,
  formInputSecondName,
  formInputPhone,
  formInputPassword,
  formInputPasswordAgain,
  acceptButton,
})

export default registrationHTML
