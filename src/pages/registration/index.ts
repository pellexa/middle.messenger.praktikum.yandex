import Handlebars from 'handlebars'
import registration from './registration.tmpl'
import formInputComponent from '../../components/formInput'
import acceptButtonComponent from '../../components/buttons/acceptButton'

const formInputEmail = Handlebars.compile(formInputComponent)({
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
})

const formInputLogin = Handlebars.compile(formInputComponent)({
  input: {
    id: 'login',
    name: 'login',
    type: 'text',
    label: {
      value: 'Логин',
    },
  },
})

const formInputFirstName = Handlebars.compile(formInputComponent)({
  input: {
    id: 'first_name',
    name: 'first_name',
    type: 'text',
    label: {
      value: 'Имя',
    },
  },
})

const formInputSecondName = Handlebars.compile(formInputComponent)({
  input: {
    id: 'second_name',
    name: 'second_name',
    type: 'text',
    label: {
      value: 'Фамилия',
    },
  },
})

const formInputPhone = Handlebars.compile(formInputComponent)({
  input: {
    id: 'phone',
    name: 'phone',
    type: 'text',
    label: {
      value: 'Телефон',
    },
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

const formInputPasswordAgain = Handlebars.compile(formInputComponent)({
  input: {
    id: 'password_again',
    name: 'password_again',
    type: 'password',
    label: {
      value: 'Пароль (ещё раз)',
    },
  },
})

const acceptButton = Handlebars.compile(acceptButtonComponent)({
  button: {
    type: 'submit',
    text: 'зарегистрироваться',
  },
})

const registrationHTML = Handlebars.compile(registration)({
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
