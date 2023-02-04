import Block from '../../modules/block'
import searchTmpl from './search.tmpl'
import { SearchProps } from './types'

export default class Search extends Block {
  constructor(tagName: string, props: SearchProps) {
    super(tagName, props)
  }

  render() {
    return this.compile(searchTmpl)
  }
}
