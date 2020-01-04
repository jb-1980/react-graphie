import * as React from "react"
import { MovablePoint } from "./movable-point"
import KhanColors from "../util/colors"
import { Plot } from "../graph-components"
import graphUtils from "../util/graph-utils"
import { useGraphie } from "../graphie-context"

type propTypes = {
  point1: number[]
  point2: number[]
  setPoint1: (p: number[]) => any
  setPoint2: (p: number[]) => any
  style?: {}
}
export const MovableTangent = ({
  point1,
  point2,
  setPoint1,
  setPoint2,
  style,
}: propTypes) => {
  const {
    range: [xrange],
  } = useGraphie()
  let a = point2[1] - point1[1]
  let b = Math.PI / (4 * (point2[0] - point1[0]))
  let c = point1[0] * b
  let d = point1[1]
  let fn = (x: number) => a * Math.tan(b * x - c) + d

  const _setPoint1 = (p: number[]) => (p[0] === point2[0] ? null : setPoint1(p))
  const _setPoint2 = (p: number[]) => (p[0] === point1[0] ? null : setPoint2(p))

  let tangentStyle = {
    stroke: KhanColors.BLUE,
    ...style,
  }
  return (
    <g style={tangentStyle}>
      <Plot fn={fn} shade={false} swapAxes={false} range={xrange} />
      <MovablePoint point={point1} setPoint={_setPoint1} />
      <MovablePoint point={point2} setPoint={_setPoint2} />
    </g>
  )
}
