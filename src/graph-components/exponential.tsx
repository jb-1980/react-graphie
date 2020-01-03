import * as React from "react"
import { useGraphie } from "../graphie-context"
import { Plot } from "./plot"

type propTypes = {
  a?: number
  b?: number
  h?: number
  k?: number
  range?: []
  style?: {}
}
export const Exponential = ({
  a = 1,
  b = Math.E,
  h = 0,
  k = 0,
  range,
  style,
}: propTypes) => {
  const {
    range: [xrange],
  } = useGraphie()

  const fn = (x: number) => a * b ** (x - h) + k
  return (
    <Plot
      fn={fn}
      range={range ? range : xrange}
      swapAxes={false}
      shade={false}
      style={style}
    />
  )
}
