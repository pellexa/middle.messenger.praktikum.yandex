import registration from "./registration.tmpl.js";
import input from '../../components/formInput/index.js'
import acceptButtonComponent from '../../components/buttons/acceptButton/index.js';
import Handlebars from 'handlebars';

const inputEmail = Handlebars.compile(input)({
    input: {
        id: 'email',
        type: 'email',
        label: {
            value: 'Почта',
        },
        // validationErrors: {
        //     error: 'Some validation error...'
        // }
    }
})

const inputLogin = Handlebars.compile(input)({
    input: {
        id: 'name',
        type: 'text',
        label: {
            value: 'Логин',
        }
    }
})

const inputFirstName = Handlebars.compile(input)({
    input: {
        id: 'first_name',
        type: 'text',
        label: {
            value: 'Имя',
        },
    }
})

const inputSecondName = Handlebars.compile(input)({
    input: {
        id: 'second_name',
        type: 'text',
        label: {
            value: 'Фамилия',
        },
    }
})

const inputPhone = Handlebars.compile(input)({
    input: {
        id: 'phone',
        type: 'text',
        label: {
            value: 'Телефон',
        },
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

const inputPasswordAgain = Handlebars.compile(input)({
    input: {
        id: 'password',
        type: 'password',
        label: {
            value: 'Пароль (ещё раз)',
        },
    }
})

const acceptButton = Handlebars.compile(acceptButtonComponent)({
    button: {
        type: 'submit',
        text: 'зарегистрироваться'
    }
})

const registrationHTML = Handlebars.compile(registration)({
    inputEmail,
    inputLogin,
    inputFirstName,
    inputSecondName,
    inputPhone,
    inputPassword,
    inputPasswordAgain,
    acceptButton,
})

export default registrationHTML
