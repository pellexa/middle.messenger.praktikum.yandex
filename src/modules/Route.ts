import nav from '../components/nav'
import { render } from '../utils/renderDOM'
import Block from './block'

type RouteProps = {
  [key: string]: unknown
  rootQueryElement: string
}

export default class Route {
  private _pathname: string
  private _block: Block
  private _props: RouteProps

  constructor(pathname: string, view: Block, props: RouteProps) {
    this._pathname = pathname
    this._block = view
    this._props = props
  }

  public leave(): void {
    this._block.remove()
  }

  public match(pathname: string): boolean {
    return pathname === this._pathname
  }

  public render(): void {
    const root = render(this._props.rootQueryElement, this._block)
    root.append(nav.getContent())
  }
}
