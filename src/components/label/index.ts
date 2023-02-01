import Block from '../../modules/block'
import labelTmpl from './label.tmpl'
import { LabelProps } from './types'

export default class Label extends Block {
  constructor(tagName: string, props: LabelProps) {
    super(tagName, props)
  }

  render() {
    return this.compile(labelTmpl)
  }
}
