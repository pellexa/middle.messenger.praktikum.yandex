import signinTmpl from './signin.tmpl.js'
import formInputComponent from '../../components/formInput/index.js'
import acceptButtonComponent from '../../components/buttons/acceptButton/index.js';
import Handlebars from 'handlebars';

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
    }
})

const formInputPassword = Handlebars.compile(formInputComponent)({
    input: {
        id: 'password',
        name: 'password',
        type: 'password',
        label: {
            value: 'Пароль',
        },
    }
})

const acceptButton = Handlebars.compile(acceptButtonComponent)({
    button: {
        type: 'submit',
        text: 'войти'
    }
})

const signinHTML = Handlebars.compile(signinTmpl)({
    formInputLogin,
    formInputPassword,
    acceptButton,
})

export default signinHTML
