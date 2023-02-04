import Block from '../../modules/block'
import buttonTmpl from './button.tmpl'

import { ButtonProps } from './types'

export default class Button extends Block {
  constructor(tagName: string, props: ButtonProps) {
    if (!props.text) {
      props.text = 'default button'
    }

    super(tagName, props)
  }

  render() {
    return this.compile(buttonTmpl)
  }
}
