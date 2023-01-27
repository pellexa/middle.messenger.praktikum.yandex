import Block from '../../modules/block'
import errorTmpl from './error.tmpl'
import { ErrorProps } from './types'

export default class TheError extends Block {
  constructor(tagName: string, props: ErrorProps) {
    if (!props.error) {
      throw new Error('The error property is required.')
    }

    super(tagName, props)
  }

  render() {
    return this.compile(errorTmpl)
  }
}
