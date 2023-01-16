import Handlebars from 'handlebars'
import profileUploadAvatar from './profileUploadAvatar.tmpl'
import acceptButtonComponent from '../../../components/buttons/acceptButton'

const acceptButton = Handlebars.compile(acceptButtonComponent)({
  button: {
    type: 'submit',
    text: 'поменять',
  },
})

const profileUploadAvatarHTML = Handlebars.compile(profileUploadAvatar)({
  acceptButton,
})

setTimeout(() => {
  const elemModal = document.querySelector('.modal')
  document.addEventListener('click', closeModal)

  function closeModal(event) {
    if (event.target === elemModal) {
      elemModal.style.display = 'none'
    }
  }

  // const elemInputUploadAvatar = document.querySelector('.modal__input-upload')
  // elemInputUploadAvatar.addEventListener('input', uploadAvatar)
  // function uploadAvatar(event) {
  //     // console.log('event.target.files[0].name: ', event.target.files[0].name)
  //     return event.target.files[0].name
  // }
})

export default profileUploadAvatarHTML
