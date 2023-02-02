import profileDetailedTmpl from './profileDetailed.tmpl'
import IconBackSvg from '../../../components/icons/IconBack.svg'
import Block from '../../../modules/block'
import { ProfileDetailedProps } from './types'

class ProfileDetailed extends Block {
  constructor(tagName: string, props: ProfileDetailedProps) {
    // if (!props.apiResponseProfile) {
    //   throw new Error('ProfileDetailed apiResponseProfile is undefined.')
    // }

    super(tagName, props)
  }

  render() {
    return this.compile(profileDetailedTmpl)
  }
}

const profileDetailedHTML = new ProfileDetailed(
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
  }
)

export default profileDetailedHTML
