import profileDetailed from "./profileDetailed.tmpl.js";
import IconBackSvg from "../../../components/icons/IconBack.svg.js";
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

const profileDetailedHTML = Handlebars.compile(profileDetailed)({
    apiResponseProfile,
    IconBack
})

export default profileDetailedHTML
