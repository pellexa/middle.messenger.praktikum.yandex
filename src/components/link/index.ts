import Block from '../../modules/block'
import linkTmpl from './link.tmpl'

import { LinkProps } from './types'

export default class Link extends Block {
  constructor(tagName: string, props: LinkProps) {
    super(tagName, props)
  }

  render() {
    return this.compile(linkTmpl)
  }
}
