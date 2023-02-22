import Block from '../../modules/block'
import store from '../../servises/store'
import inputTmpl from './input.tmpl'
import { InputProps } from './types'

export default class Input extends Block {
  constructor(tagName: string, props: InputProps) {
    super(tagName, props)
  }

  public componentDidMount(): void {
    this.setValue()
  }

  public setValue() {
    const state = store.getState()
    const propName = this.element.dataset.inputValue
    if (propName) {
      const value = state.auth?.user[propName] ? state.auth?.user[propName] : ''
      this.element.setAttribute('value', value as string)
    }
  }

  render() {
    return this.compile(inputTmpl)
  }
}
