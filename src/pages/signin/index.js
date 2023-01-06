import signin from './signin.tmpl.js'
import input from '../../components/formInput/index.js'
import acceptButtonComponent from '../../components/buttons/acceptButton/index.js';
import Handlebars from 'handlebars';

const inputLogin = Handlebars.compile(input)({
    input: {
        id: 'name',
        type: 'text',
        label: {
            value: 'Логин',
        },
        // validationErrors: {
        //     error: 'Some validation error...'
        // }
    }
})

const inputPassword = Handlebars.compile(input)({
    input: {
        id: 'password',
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

const signinHTML = Handlebars.compile(signin)({
    inputLogin,
    inputPassword,
    acceptButton,
})

export default signinHTML
