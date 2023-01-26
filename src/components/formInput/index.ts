import Block from '../../modules/block'
import formInputTmpl from './formInput.tmpl'
import { InputProps } from './types'

export default class Input extends Block {
  constructor(tagName: string, props: InputProps) {
    if (!props.input) {
      throw new Error('The input property is required.')
    }

    super(tagName, props)
  }

  render() {
    return this.compile(formInputTmpl)
  }
}
