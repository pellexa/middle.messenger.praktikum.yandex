import type Block from '../modules/block'

export function render(query: string, block: Block): Element | never {
  const root = document.querySelector(query)

  if (root) {
    root.append(block.getContent())
    block.dispatchComponentDidMount()
    return root
  }

  throw new Error('The root element in not found.')
}
