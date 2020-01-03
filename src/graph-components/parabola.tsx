import * as React from "react"
import GraphUtils from "../util/graph-utils"
import { useGraphie } from "../graphie-context"

type propTypes = {
  a: number
  b: number
  c: number
  style?: {}
}
export const Parabola = ({ a, b, c, style }: propTypes) => {
  const { scale, range } = useGraphie()
  const path = GraphUtils.svgParabolaPath(a, b, c, range, scale)

  let parabolaStyle = {
    fill: "none",
    strokeWidth: 3,
    ...style,
  }
  return <path d={path} style={parabolaStyle} />
}
