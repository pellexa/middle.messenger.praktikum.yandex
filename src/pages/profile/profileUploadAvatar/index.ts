import profileUploadAvatarTmpl from './profileUploadAvatar.tmpl'
import { ProfileUploadAvatarProps } from './types'
import Block from '../../../modules/block'

export default class ProfileUploadAvatar extends Block {
  constructor(tagName: string, props: ProfileUploadAvatarProps) {
    // if (!props.acceptButton) {
    //   throw new Error('profileUploadAvatarPage must have a button.')
    // }

    super(tagName, props)
  }

  render() {
    return this.compile(profileUploadAvatarTmpl)
  }
}
