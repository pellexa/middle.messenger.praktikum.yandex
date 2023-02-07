import Link from '../../../components/link'
import TheError from '../../../components/theError'
import Router from '../../../modules/Router'

const linkBack = new Link(
  'a',
  {
    tagAttrs: {
      class: 'error-box__link link_color_blue',
      href: '/messanger',
    },
    content: 'назад к чатам',
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

const error404 = new TheError(
  'main',
  {
    tagAttrs: {
      class: 'error-box',
    },
    error: {
      status: 404,
      text: 'не туда попали',
    },
    linkBack,
  }
)

export default error404
