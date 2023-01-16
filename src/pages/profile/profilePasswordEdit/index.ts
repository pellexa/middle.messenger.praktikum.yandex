import Handlebars from 'handlebars'
import profilePasswordEdit from './profilePasswordEdit.tmpl'
import IconBackSvg from '../../../components/icons/IconBack.svg'
import acceptButtonComponent from '../../../components/buttons/acceptButton'

const IconBack = Handlebars.compile(IconBackSvg)

const apiResponseProfile = {
  id: 123,
  first_name: 'Petya',
  second_name: 'Pupkin',
  display_name: 'Petya Pupkin',
  login: 'userLogin',
  email: 'my@email.com',
  phone: '89223332211',
  avatar: '/path/to/avatar.jpg',
}

const acceptButton = Handlebars.compile(acceptButtonComponent)({
  button: {
    type: 'submit',
    text: 'сохранить',
  },
})

const profilePasswordEditHTML = Handlebars.compile(profilePasswordEdit)({
  apiResponseProfile,
  IconBack,
  acceptButton,
})

export default profilePasswordEditHTML
