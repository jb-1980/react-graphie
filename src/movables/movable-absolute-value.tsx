import * as React from "react"
import { MovablePoint } from "./movable-point"
import KhanColors from "../util/colors"
import GraphUtils from "../util/graph-utils"
import { useGraphie } from "../graphie-context"
import { Line } from "../graph-components"

type propTypes = {
  vertex: number[]
  point: number[]
  setVertex: (p: number[]) => any
  setPoint: (p: number[]) => any
  style?: {}
}
export const MovableAbsoluteValue = ({
  vertex,
  point,
  setVertex,
  setPoint,
  style,
}: propTypes) => {
  const {
    range: [xrange],
  } = useGraphie()
  const m = Math.abs(GraphUtils.getSlope(vertex, point))

  const y = (x: number) =>
    vertex[1] < point[1]
      ? m * Math.abs(x - vertex[0]) + vertex[1]
      : -m * Math.abs(x - vertex[0]) + vertex[1]

  const left = [xrange[0], y(xrange[0])]
  const right = [xrange[1], y(xrange[1])]

  // set up some extra constraints to ensure that we don't get a vertical line
  const _setVertex = (p: number[]) => (p[0] === point[0] ? null : setVertex(p))
  const _setPoint = (p: number[]) => (p[0] === vertex[0] ? null : setPoint(p))

  let absoluteValueStyle = {
    stroke: KhanColors.BLUE,
    ...style,
  }
  return (
    <g style={absoluteValueStyle}>
      <Line start={left} end={vertex} />
      <Line start={vertex} end={right} />
      <MovablePoint point={vertex} setPoint={_setVertex} />
      <MovablePoint point={point} setPoint={_setPoint} />
    </g>
  )
}
