import type Block from '../modules/block'

export function render(query: string, block: Block) {
  const root = document.querySelector(query)

  if (root) {
    root.append(block.getContent())
  }

  block.dispatchComponentDidMount()
  return root
}
