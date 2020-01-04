import * as React from "react"
import { MovablePoint } from "./movable-point"
import { MovableAsymptote } from "./movable-asymptote"
import KhanColors from "../util/colors"
import { Exponential } from "../graph-components"

type propTypes = {
  axis: number
  point1: number[]
  point2: number[]
  setAxis: (x: number) => any
  setPoint1: (p: number[]) => any
  setPoint2: (p: number[]) => any
  style?: {}
}
export const MovableExponential = ({
  axis,
  point1,
  point2,
  setAxis,
  setPoint1,
  setPoint2,
  style,
}: propTypes) => {
  let k = axis
  let b = Math.log((point1[1] - k) / (point2[1] - k)) / (point1[0] - point2[0])
  let a = (point1[1] - k) / Math.exp(b * point1[0])

  let exponentialStyle = {
    stroke: KhanColors.BLUE,
    strokeWidth: 3,
    ...style,
  }

  const _setAxis = (x: number) => {
    // restrict asymptote to only move up to the closes point
    if (k < point1[1] === k < point2[1] && x < point1[1] === x < point2[1]) {
      // both points are on the same side of the asymptote
      return setAxis(x)
    }
    return null
  }

  // we want to make sure that both points are above or below the asymptote.
  // So if we move a point across the asymptote we need to reflect the other one
  const _setPoint1 = (p: number[]) => {
    if (p[1] < k !== point2[1] < k) {
      // point has crossed the asymptote
      setPoint1(p)
      setPoint2([point2[0], -point2[1]])
    } else {
      setPoint1(p)
    }
  }

  // make sure we reflect the point the same across the asymptote
  const _setPoint2 = (p: number[]) => {
    if (p[1] < k !== point1[1] < k) {
      // point has crossed the asymptote
      setPoint2(p)
      setPoint1([point1[0], -point1[1]])
    } else {
      setPoint2(p)
    }
  }

  return (
    <g style={exponentialStyle}>
      <Exponential a={a} b={Math.exp(b)} k={k} />
      <MovableAsymptote axis={k} setAxis={_setAxis} />
      <MovablePoint point={point1} setPoint={_setPoint1} />
      <MovablePoint point={point2} setPoint={_setPoint2} />
    </g>
  )
}
