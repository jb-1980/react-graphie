import * as React from "react"
import { MovablePoint } from "./movable-point"
import KhanColors from "../util/colors"
import { Parabola } from "../graph-components"

type propTypes = {
  vertex: number[]
  point: number[]
  setVertex: (p: number[]) => any
  setPoint: (p: number[]) => any
  style?: {}
}
export const MovableParabola = ({
  vertex,
  point,
  setVertex,
  setPoint,
  style,
}: propTypes) => {
  let a = (point[1] - vertex[1]) / (point[0] - vertex[0]) ** 2
  let b = -2 * a * vertex[0]
  let c = a * vertex[0] * vertex[0] + vertex[1]

  return (
    <g style={style}>
      <Parabola a={a} b={b} c={c} />
      <MovablePoint point={vertex} setPoint={setVertex} />
      <MovablePoint point={point} setPoint={setPoint} />
    </g>
  )
}
