import Block from '../../modules/block'
import { ValidationErrorProps } from './types'
import validationErrorTmpl from './validationError.tmpl'

export default class ValidationError extends Block {
  constructor(tagName: string, props: ValidationErrorProps) {
    super(tagName, props)
  }

  render() {
    return this.compile(validationErrorTmpl)
  }
}
