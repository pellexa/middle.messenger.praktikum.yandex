import Button from '../../../components/button'
import { TagAttribute, ComponentEvent } from '../../../modules/types'
import ProfileUploadAvatar from '../profileUploadAvatar'

export type ProfileEditProps = {
  tagAttrs?: TagAttribute
  apiResponseProfile: {
    id: number,
    first_name: string,
    second_name: string,
    display_name: string,
    login: string,
    email: string,
    phone: string,
    avatar: string,
  },
  IconBack: string,
  acceptButton: Button
  profileUploadAvatar: ProfileUploadAvatar
  events?: ComponentEvent
}
