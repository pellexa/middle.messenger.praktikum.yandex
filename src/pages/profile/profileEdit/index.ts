import profileEditTmpl from './profileEdit.tmpl'
import IconBackSvg from '../../../components/icons/IconBack.svg'
import Block from '../../../modules/block'
import { ProfileEditProps } from './types'
import Button from '../../../components/button'
import ProfileUploadAvatar from '../profileUploadAvatar'

const acceptButton = new Button(
  'button',
  {
    tagAttrs: {
      class: 'button',
      type: 'button',
    },
    text: 'сохранить ProfileEdit',
    events: {
      click: (event: Event) => {
        event.preventDefault()
        console.log('Button profileEdit event: ', event)
      },
    },
  },
)

const acceptButtonUploadAvatar = new Button(
  'button',
  {
    tagAttrs: {
      class: 'button',
      type: 'submit',
    },
    text: 'поменять UploadAvatar',
    events: {
      click: (event: Event) => {
        event.preventDefault()
        console.log('Button profileUploadAvatar event: ', event)
      },
    },
  },
)

const profileUploadAvatar = new ProfileUploadAvatar(
  'div',
  {
    tagAttrs: {
      class: 'modal',
    },
    acceptButton: acceptButtonUploadAvatar,
    events: {
      click: (event: Event) => {
        const elemModal = (document.querySelector('.modal') as HTMLElement)
        if (event.target === elemModal) {
          elemModal.style.display = 'none'
        }
      },
    },
  },
)

class ProfileEdit extends Block {
  constructor(tagName: string, props: ProfileEditProps) {
    // if (!props.apiResponseProfile) {
    //   throw new Error('ProfileEdit apiResponseProfile is undefined.')
    // }

    super(tagName, props)
  }

  componentDidMount() {
    this.clickByAvatar()
  }

  clickByAvatar() {
    const elemAvatar = document.querySelector('.avatar')
    const elemModal = (document.querySelector('.modal') as HTMLElement)

    if (elemAvatar) {
      elemAvatar.addEventListener('click', () => {
        elemModal.style.display = 'block'
      })
    }
  }

  render() {
    return this.compile(profileEditTmpl)
  }
}

const profileEditHTML = new ProfileEdit(
  'div',
  {
    tagAttrs: {
      class: 'profile',
    },
    apiResponseProfile: {
      id: 123,
      first_name: 'Petya',
      second_name: 'Pupkin',
      display_name: 'Petya Pupkin',
      login: 'userLogin',
      email: 'my@email.com',
      phone: '89223332211',
      avatar: '/path/to/avatar.jpg',
    },
    IconBack: IconBackSvg,
    profileUploadAvatar,
    acceptButton,
  },
)

export default profileEditHTML
