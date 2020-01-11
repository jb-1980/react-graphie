import * as React from "react"
import { cartFromPolarRad } from "../util/math/vector"
import { Parametric } from "./parametric"

type propTypes = {
  fn: (th: number) => number[]
  style?: {}
}
export const Polar = ({ fn, style }: propTypes) => {
  return (
    <Parametric
      fn={theta => cartFromPolarRad(fn(theta), theta)}
      style={style}
    />
  )
}
