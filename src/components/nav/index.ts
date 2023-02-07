import Block from '../../modules/block'
import Router from '../../modules/Router'
import Link from '../link'
import Wrapper from '../wrapper'
import navTmpl from './nav.tmpl'
import { NavProps } from './types'

const navItems = {
  '/': 'Signin',
  '/sign-up': 'Registration',
  '/messanger': 'Chat',
  '/settings': 'Profile detailed',
  '/settings/edit': 'Profile edit',
  '/settings/password/edit': 'Profile password edit',
  '/404': '404',
  '/500': '500',
}

const navList = Object.entries(navItems).map(([path, text]) => {
  const link = new Link(
    'a',
    {
      tagAttrs: {
        href: path,
        class: 'link link_color_blue',
      },
      content: text,
      events: {
        click: (event: Event) => {
          event.preventDefault()

          const element = event.target as HTMLElement
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

  const wrapper = new Wrapper(
    'li',
    {
      content: link,
    }
  )

  return wrapper
})

class Nav extends Block {
  constructor(tagName: string, props: NavProps){
    super(tagName, props)
  }
  render() {
    return this.compile(navTmpl)
  }
}

const nav = new Nav(
  'nav',
  {
    tagAttrs: { class: 'tmp-nav' },
    navList,
  }
)

export default nav
