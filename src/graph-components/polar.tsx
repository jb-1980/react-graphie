import * as React from "react"
import GraphUtils from "../util/graph-utils"
import { useGraphie } from "../graphie-context"
import { Parametric } from "./parametric"

type propTypes = {
  fn: (th: number) => number[]
  style?: {}
}
export const Polar = ({ fn, style }: propTypes) => {
  return (
    <Parametric
      fn={theta => GraphUtils.polar(fn(theta), (theta * 180) / Math.PI)}
      style={style}
    />
  )
}
