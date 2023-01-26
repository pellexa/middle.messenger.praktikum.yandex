import signinTmpl from './signin.tmpl'
import Button from '../../components/button'
import Input from '../../components/formInput'
import Block from '../../modules/block'

import { SigninProps } from './types'

const acceptButton = new Button(
  'button',
  {
    tagAttrs: {
      class: 'button',
      type: 'submit',
    },
    text: 'войти',
    events: {
      click: (event: Event) => {
        event.preventDefault()
        console.log('Button signin event: ', event)
      },
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
      // validationErrors: {
      //     error: 'Some validation error...'
      // }
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
  formInputLogin,
  formInputPassword,
  acceptButton,
})

export default signinHTML
