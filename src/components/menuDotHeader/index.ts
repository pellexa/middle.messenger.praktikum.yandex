import Block from '../../modules/block'
import connect from '../../servises/store/connect'
import { State } from '../../servises/store/store'
import { isEqual } from '../../utils/helpers'
import menuDotHeaderTmpl from './menuDotHeader.tmpl'
import { MenuDotHeaderProps } from './types'

class MenuDotHeader extends Block {
  constructor(tagName: string, props: MenuDotHeaderProps) {
    super(tagName, props)
  }

  public componentDidUpdate(oldProps: any, newProps: any): boolean {
    return !isEqual(oldProps ?? {} , newProps ?? {})
  }

  render() {
    return this.compile(menuDotHeaderTmpl)
  }
}

function mapAuthToProps(state: State) {
  return {
    userName: state.auth?.user.login,
  }
}

export default connect(mapAuthToProps)(MenuDotHeader)
