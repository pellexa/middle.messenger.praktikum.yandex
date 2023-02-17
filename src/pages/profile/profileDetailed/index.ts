import profileDetailedTmpl from './profileDetailed.tmpl'
import IconBackSvg from '../../../components/icons/IconBack.svg'
import Block from '../../../modules/block'
import { ProfileDetailedProps } from './types'
import Router from '../../../modules/Router'
import Link from '../../../components/link'
import Wrapper from '../../../components/wrapper'
import AuthController from '../../../controllers/auth'

const linkBack = new Link(
  'a',
  {
    tagAttrs: {
      class: 'link__icon-back',
      href: '/messanger',
    },
    content: IconBackSvg,
    events: {
      click: (event: Event) => {
        event.preventDefault()

        const element = event.currentTarget as HTMLLinkElement
        const router = Router.getInstance()
        const uri = element.getAttribute('href')

        if (!uri) {
          throw new Error('The href attribute must exist on the "a" tag.')
        }

        router.go(uri)
      },
    },
  }
)

const linkChangeData = new Link(
  'a',
  {
    tagAttrs: {
      class: 'link profile_margin-data link_color_blue',
      href: '/settings/edit',
    },
    content: 'изменить данные',
    events: {
      click: (event: Event) => {
        event.preventDefault()

        const element = event.target as HTMLLinkElement
        const router = Router.getInstance()
        const uri = element.getAttribute('href')

        if (!uri) {
          throw new Error('The href attribute must exist on the "a" tag.')
        }

        router.go(uri)
      },
    },
  }
)

const linkChangePassword = new Link(
  'a',
  {
    tagAttrs: {
      class: 'link profile_margin-data link_color_blue',
      href: '/settings/password/edit',
    },
    content: 'изменить пароль',
    events: {
      click: (event: Event) => {
        event.preventDefault()

        const element = event.target as HTMLLinkElement
        const router = Router.getInstance()
        const uri = element.getAttribute('href')

        if (!uri) {
          throw new Error('The href attribute must exist on the "a" tag.')
        }

        router.go(uri)
      },
    },
  }
)

const linkSignout = new Link(
  'a',
  {
    tagAttrs: {
      href: '/',
      class: 'link profile_margin-data link_color_red',
    },
    content: 'Выход',
    events: {
      click: (event: Event) => {
        event.preventDefault()

        const authController = new AuthController(event)
        authController.signuot()
      },
    },
  }
)

const attrs = {
  class: 'profile-properties__row',
}

const wrapperLinkBack = new Wrapper(
  'div',
  {
    tagAttrs: attrs,
    content: linkBack,
  }
)
const wrapperLinkChangeData = new Wrapper(
  'div',
  {
    tagAttrs: attrs,
    content: linkChangeData,
  }
)
const wrapperLinkChangePassword = new Wrapper(
  'div',
  {
    tagAttrs: attrs,
    content: linkChangePassword,
  }
)

const wrapperSignout = new Wrapper(
  'div',
  {
    tagAttrs: attrs,
    content: linkSignout,
  }
)

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

const profileDetailed = new ProfileDetailed(
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
    linkBack: wrapperLinkBack,
    linkChangeData: wrapperLinkChangeData,
    linkChangePassword: wrapperLinkChangePassword,
    linkSignout: wrapperSignout,
  }
)

export default profileDetailed
