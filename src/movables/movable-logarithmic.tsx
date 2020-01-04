import * as React from "react"
import { MovablePoint } from "./movable-point"
import { MovableAsymptote } from "./movable-asymptote"
import { Logarithmic } from "../graph-components/logarithmic"
import KhanColors from "../util/colors"
import { useGraphie } from "../graphie-context"

type propTypes = {
  axis: number
  point1: number[]
  point2: number[]
  setAxis: (x: number) => any
  setPoint1: (p: number[]) => any
  setPoint2: (p: number[]) => any
  style?: {}
}
export const MovableLogarithmic = ({
  axis,
  point1,
  point2,
  setAxis,
  setPoint1,
  setPoint2,
  style,
}: propTypes) => {
  const {
    range: [xrange],
  } = useGraphie()
  // it is easier to reason about these values in the exponential form
  // y = a*exp(b*x) + k. Find the inverse function: y = 1/b*ln(x-k) - 1/b*ln(a),
  // left as an exercise for the reader.
  // Since exponetial is the inverse of logarithmic, we can just solve the
  // inverse points to get a, b and find _a = 1/b, _b = e and _k = -1/b*ln(a)
  let k = axis
  let b = Math.log((point1[0] - k) / (point2[0] - k)) / (point1[1] - point2[1])
  let a = (point1[0] - k) / Math.exp(b * point1[1])

  let _a = 1 / b
  let _b = Math.E
  let _k = a > 0 ? (-1 / b) * Math.log(a) : -Math.log(-a) / b
  let range = a > 0 ? [axis, xrange[1]] : [xrange[0], axis]

  let logarithmicStyle = {
    stroke: KhanColors.BLUE,
    strokeWidth: 3,
    ...style,
  }

  // modify set functions to constrain movement to mathematically logical positions
  const _setAxis = (x: number) => {
    // restrict asymptote to only move up to the closest point
    if (
      k < point1[0] === k < point2[0] &&
      x < point1[0] === x < point2[0] &&
      x !== point1[0] &&
      x !== point2[0]
    ) {
      // both points are on the same side of the asymptote
      return setAxis(x)
    }
    return null
  }

  // we want to make sure that both points are above or below the asymptote.
  // So if we move a point across the asymptote we need to reflect the other one
  const _setPoint1 = (p: number[]) => {
    // cannot have the same x or y value
    if (p[1] === point2[1] || p[0] === point2[0]) return null

    if (p[0] < k !== point2[0] < k) {
      // point has crossed the asymptote
      setPoint1(p)
      setPoint2([-point2[0], point2[1]])
    } else {
      setPoint1(p)
    }
  }

  // make sure we reflect the point the same across the asymptote
  const _setPoint2 = (p: number[]) => {
    // cannot have the same x or y value
    if (p[1] === point1[1] || p[0] === point1[0]) return null

    if (p[0] < k !== point1[0] < k) {
      // point has crossed the asymptote
      setPoint2(p)
      setPoint1([-point1[0], point1[1]])
    } else {
      setPoint2(p)
    }
  }

  console.log({ _a, _b, k, _k, point1, point2, axis })
  return (
    <g style={logarithmicStyle}>
      <Logarithmic a={_a} b={_b} h={k} k={_k} range={range} />
      <MovableAsymptote axis={k} setAxis={_setAxis} vertical={true} />
      <MovablePoint point={point1} setPoint={_setPoint1} />
      <MovablePoint point={point2} setPoint={_setPoint2} />
    </g>
  )
}
