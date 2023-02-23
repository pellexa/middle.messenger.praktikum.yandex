import modalTmpl from './modal.tmpl'
import { modalProps } from './types'
import Block from '../../modules/block'

export default class Modal extends Block {
  constructor(tagName: string, props: modalProps) {
    super(tagName, props)
  }

  render() {
    return this.compile(modalTmpl)
  }
}
