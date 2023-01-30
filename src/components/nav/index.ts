import Block from '../../modules/block'
import { PropsObject } from '../../modules/types'

import navTmpl from './nav.tmpl'

class Nav extends Block {
  constructor(tagName: string, props: PropsObject){
    super(tagName, props)
  }
  render() {
    return this.compile(navTmpl)
  }
}

const nav = new Nav('nav', { tagAttrs: {class: 'tmp-nav'}})

export default nav
