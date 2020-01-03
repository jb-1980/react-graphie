import * as React from "react"
import GraphUtils from "../util/graph-utils"
import { useGraphie } from "../graphie-context"

type propTypes = {
  points: number[][]
  closed?: boolean
  style?: {}
}
export const Path = ({ points, closed = false, style }: propTypes) => {
  const { range, scale } = useGraphie()
  const path = GraphUtils.svgPath(points, range, scale, closed)

  console.log({ pathStyle: style })
  let pathStyle = {
    fill: "none",
    ...style,
  }
  console.log({ _pathStyle: pathStyle })
  return <path d={path} style={pathStyle} />
}
