export type Listener = {
  [key: string]: Function[];
}

export type TagAttribute = {
  [key: string]: string
}

export type ComponentEvent = {
  [key: string]: EventListenerOrEventListenerObject
}

export type PropsObject = {
  tagAttrs?: TagAttribute
  events?: ComponentEvent
  [key: string]: unknown
}

export type Meta = {
  tagName: string
  ownProps: PropsObject
}

export interface IBlock {
  props: PropsObject
  element: HTMLElement
  id: string
  render(): DocumentFragment | string
  compile(template: string, props: PropsObject): DocumentFragment
  componentDidMount(): void
  dispatchComponentDidMount(): void
  componentDidUpdate(oldProps: string, newProps: string): boolean
  setProps(nextProps: PropsObject): void
  getContent(): HTMLElement
  show(): void
  hide(): void
}
