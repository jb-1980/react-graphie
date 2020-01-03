import * as React from "react"
import GraphUtils from "../util/graph-utils"
import { useGraphie } from "../graphie-context"

type propTypes = {
  x: number
  y: number
  width: number
  height: number
  style?: {}
}
// (x, y) is coordinate of upper left corner
export const Rect = ({ x, y, width, height, style }: propTypes) => {
  const { range, scale } = useGraphie()
  const [_x, _y] = GraphUtils.scalePoint([x, y], range, scale)
  const [_width, _height] = GraphUtils.scaleVector(
    [width, height],
    range,
    scale
  )

  return <rect x={_x} y={_y} width={_width} height={_height} style={style} />
}
