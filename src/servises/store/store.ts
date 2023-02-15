import EventBus from '../../modules/eventBus'
import { set } from '../../utils/helpers'

export type State = {
  [key: string]: any
}

export enum StoreEvents {
  UPDATED = 'store:updated',
}

export default class Store extends EventBus {
  public state: State = {}

  constructor() {
    super()
  }

  public getState() {
    return this.state
  }

  public set(path: string, value: any) {
    set(this.state, path, JSON.parse(value))
    this.emit(StoreEvents.UPDATED)
    return this
  }
}
