import Block from '../../modules/block'
import store from '../../servises/store'
import { StoreEvents } from '../../servises/store/store'
import menuDotHeaderTmpl from './menuDotHeader.tmpl'
import { MenuDotHeaderProps } from './types'

export default class MenuDotHeader extends Block {
  constructor(tagName: string, props: MenuDotHeaderProps) {
    super(tagName, props)

    store.on(StoreEvents.UPDATED, () => {
      const state = store.getState()
      this.setProps({ userName: state.auth.user.login })
    })
  }

  render() {
    return this.compile(menuDotHeaderTmpl)
  }
}
