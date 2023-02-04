import Block from '../../modules/block'
import menuDotHeaderTmpl from './menuDotHeader.tmpl'
import { MenuDotHeaderProps } from './types'

export default class MenuDotHeader extends Block {
  constructor(tagName: string, props: MenuDotHeaderProps) {
    super(tagName, props)
  }

  render() {
    return this.compile(menuDotHeaderTmpl)
  }
}
