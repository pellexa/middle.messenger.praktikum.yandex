import Handlebars from 'handlebars'
import signin from './signin.tmpl'
import formInputComponent from '../../components/formInput'
import acceptButtonComponent from '../../components/buttons/acceptButton'

const formInputLogin = Handlebars.compile(formInputComponent)({
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
})

const formInputPassword = Handlebars.compile(formInputComponent)({
  input: {
    id: 'password',
    name: 'password',
    type: 'password',
    label: {
      value: 'Пароль',
    },
  },
})

const acceptButton = Handlebars.compile(acceptButtonComponent)({
  button: {
    type: 'submit',
    text: 'войти',
  },
})

const signinHTML = Handlebars.compile(signin)({
  formInputLogin,
  formInputPassword,
  acceptButton,
})

export default signinHTML
