import Block from '../../modules/block'
import connect from '../../servises/store/connect'
import { State } from '../../servises/store/store'
import { isEqual } from '../../utils/helpers'
import searchUserListTmpl from './searchUserList.tmpl'
import { SearchUserListProps } from './types'

class SearchUserList extends Block {
  constructor(tagName: string, props: SearchUserListProps) {
    super(tagName, props)
  }

  public componentDidUpdate(oldProps: unknown, newProps: unknown): boolean {
    return !isEqual(oldProps ?? {} , newProps ?? {})
  }

  render() {
    return this.compile(searchUserListTmpl)
  }
}

function mapSearchUserListToProps(state: State) {
  return {
    data: state.chats?.alreadyAddedUsers,
  }
}

export default connect<typeof SearchUserList>(mapSearchUserListToProps)(SearchUserList)
