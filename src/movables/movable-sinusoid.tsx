import * as React from "react"
import { MovablePoint } from "./movable-point"
import KhanColors from "../util/colors"
import { Sinusoid } from "../graph-components"

type propTypes = {
  midpoint: number[]
  maxpoint: number[]
  setMidpoint: (p: number[]) => any
  setMaxpoint: (p: number[]) => any
  style?: {}
}
export const MovableSinusoid = ({
  midpoint,
  maxpoint,
  setMidpoint,
  setMaxpoint,
  style,
}: propTypes) => {
  let a = midpoint[1] - maxpoint[1]
  let b = Math.PI / (2 * (midpoint[0] - maxpoint[0]))
  let c = maxpoint[0] * b + Math.PI / 2
  let d = midpoint[1]

  let _setMidpoint = (p: number[]) =>
    p[0] === maxpoint[0] ? null : setMidpoint(p)
  let _setMaxpoint = (p: number[]) =>
    p[0] === midpoint[0] ? null : setMaxpoint(p)
  return (
    <g style={style}>
      <Sinusoid a={a} b={b} c={c} d={d} />
      <MovablePoint point={midpoint} setPoint={_setMidpoint} />
      <MovablePoint point={maxpoint} setPoint={_setMaxpoint} />
    </g>
  )
}
