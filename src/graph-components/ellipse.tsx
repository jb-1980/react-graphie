import * as React from "react"
import { useGraphie } from "../graphie-context"
import GraphUtils from "../util/graph-utils"

type propType = {
  center: number[]
  radii: number[]
  style?: {}
}
export const Ellipse = ({ center, radii, style }: propType) => {
  const { range, scale } = useGraphie()
  const [cx, cy] = GraphUtils.scalePoint(center, range, scale)
  const [rx, ry] = GraphUtils.scaleVector(radii, range, scale)

  const ellipseStyle = {
    fill: "none",
    ...style,
  }
  return <ellipse cx={cx} cy={cy} rx={rx} ry={ry} style={ellipseStyle} />
}
