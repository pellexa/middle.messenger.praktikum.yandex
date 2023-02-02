import Block from "../../modules/block"
import timeTmpl from "./time.tmpl"
import { TimeProps } from "./types"

export default class Time extends Block {
  constructor(tagName: string, props: TimeProps) {
    super(tagName, props)
  }

  render() {
    return this.compile(timeTmpl)
  }
}
