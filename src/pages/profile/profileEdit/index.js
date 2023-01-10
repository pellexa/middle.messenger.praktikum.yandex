import profileEdit from "./profileEdit.tmpl.js";
import IconBackSvg from "../../../components/icons/IconBack.svg.js";
import acceptButtonComponent from '../../../components/buttons/acceptButton/index.js';
import profileUploadAvatar from "../profileUploadAvatar/index.js";
import Handlebars from 'handlebars';

const IconBack = Handlebars.compile(IconBackSvg)

const apiResponseProfile = {
    "id": 123,
    "first_name": "Petya",
    "second_name": "Pupkin",
    "display_name": "Petya Pupkin",
    "login": "userLogin",
    "email": "my@email.com",
    "phone": "89223332211",
    "avatar": "/path/to/avatar.jpg"
}

const acceptButton = Handlebars.compile(acceptButtonComponent)({
    button: {
        type: 'submit',
        text: 'сохранить',
    }
})

const profileEditHTML = Handlebars.compile(profileEdit)({
    apiResponseProfile,
    IconBack,
    acceptButton,
    profileUploadAvatar,
})

setTimeout(() => {
    const elemAvatar = document.querySelector('.avatar')
    const elemModal = document.querySelector('.modal')
    elemAvatar.addEventListener('click', buttonClick)

    function buttonClick() {
        elemModal.style.display = "block";
    }
})

export default profileEditHTML
