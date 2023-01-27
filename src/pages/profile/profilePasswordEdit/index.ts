import profilePasswordEditTmpl from './profilePasswordEdit.tmpl'
import IconBackSvg from '../../../components/icons/IconBack.svg'
import Button from '../../../components/button'
import { ProfilePasswordEditProps } from './types'
import Block from '../../../modules/block'

const acceptButton = new Button(
  'button',
  {
    tagAttrs: {
      class: 'button',
      type: 'submit',
    },
    text: 'сохранить',
    events: {
      click: (event: Event) => {
        event.preventDefault()
        console.log('Button profilePasswordEdit event: ', event)
      },
    },
  },
)

class ProfilePasswordEdit extends Block {
  constructor(tagName: string, props: ProfilePasswordEditProps) {
    // if (!props.apiResponseProfile) {
    //   throw new Error('ProfilePasswordEdit apiResponseProfile is undefined.')
    // }

    super(tagName, props)
  }

  render() {
    return this.compile(profilePasswordEditTmpl)
  }
}

const profilePasswordEditHTML = new ProfilePasswordEdit(
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
    acceptButton,
    IconBack: IconBackSvg,
  },
)

export default profilePasswordEditHTML
