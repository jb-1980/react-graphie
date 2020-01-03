import * as React from "react"
import { useGraphie } from "../graphie-context"
import { Plot } from "./plot"

type propTypes = {
  a?: number
  b?: number
  h?: number
  k?: number
  range?: number[]
  style?: {}
}
export const Logarithmic = ({
  a = 1,
  b = 10,
  h = 0,
  k = 0,
  range,
  style,
}: propTypes) => {
  const {
    range: [xrange],
  } = useGraphie()
  let log
  if (b === 10) {
    log = Math.log10
  } else if (b === Math.E) {
    log = Math.log
  } else {
    log = (x: number) => Math.log(x) / Math.log(b)
  }

  const fn = (x: number) => a * log(x - h) + k

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
