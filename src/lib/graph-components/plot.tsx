import React from "react"
import { Parametric } from "./parametric"

type propTypes = {
  fn: (t: number) => number
  range: number[]
  swapAxes: boolean
  shade: boolean
  fn2?: (t: number) => number
  style?: {}
}
export const Plot = ({ fn, range, swapAxes, shade, fn2, style }: propTypes) => {
  if (swapAxes) {
    if (fn2) {
      // TODO: support swapped axis area shading
      throw new Error("Can't shade area between functions with swapped axes.")
    }
    return (
      <Parametric
        fn={y => [fn(y), y]}
        range={range}
        shade={shade}
        style={style}
      />
    )
  } else {
    if (fn2) {
      if (shade) {
        return (
          <Parametric
            fn={x => [x, fn(x)]}
            shade={shade}
            range={range}
            fn2={x => [x, fn2(x)]}
            style={style}
          />
        )
      } else {
        throw new Error("fn2 should only be set when 'shade' is True.")
      }
    }
    return (
      <Parametric
        fn={x => [x, fn(x)]}
        range={range}
        shade={shade}
        style={style}
      />
    )
  }
}
