import Block from '../../modules/block'
import inputTmpl from './input.tmpl'
import { InputProps } from './types'

export default class Input extends Block {
  constructor(tagName: string, props: InputProps) {
    super(tagName, props)
  }

  render() {
    return this.compile(inputTmpl)
  }
}
