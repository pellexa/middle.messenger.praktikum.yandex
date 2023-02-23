import Block from '../../modules/block'
import wrapperTmpl from './wrapper.tmpl'

import { wrapperProps } from './types'

export default class Wrapper extends Block {
  constructor(tagName: string, props: wrapperProps) {
    super(tagName, props)
  }

  render() {
    return this.compile(wrapperTmpl)
  }
}
