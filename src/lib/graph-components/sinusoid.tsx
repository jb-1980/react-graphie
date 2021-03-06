import React from "react"

import { sinusoid } from "../util/svg-math"
import { useGraphie } from "../graphie-context"

type sinusoidProps = {
  a: number //amplitude
  b: number // 2pi/frequency
  c: number // phase shift
  d: number // offset
  style?: {}
}
export const Sinusoid = ({ a, b, c, d, style }: sinusoidProps) => {
  const { range, scale, axisCenter } = useGraphie()
  const _d = d + axisCenter[1]
  const _c = c + axisCenter[0]
  const path = React.useMemo(() => sinusoid(a, b, _c, _d, range, scale), [
    a,
    b,
    _c,
    _d,
    range,
    scale,
  ])

  const sinusoidStyle = {
    fill: "none",
    ...style,
  }
  return <path d={path} style={sinusoidStyle} />
}
