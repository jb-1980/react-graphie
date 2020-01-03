import * as React from "react"
import GraphUtils from "../util/graph-utils"
import { useGraphie } from "../graphie-context"
import { Line } from "./line"

type propTypes = {
  fn: (x: number) => number
  style?: {}
}
// find and plot the asymptotes of the supplied function. You would usually
// use this in conjunction with another component like Plot or Parametric
export const Asymptotes = ({ fn, style }: propTypes) => {
  const { range, scale } = useGraphie()
  const min = range[0][0]
  const max = range[0][1]
  const step = (max - min) / (2 * scale[0])

  const asymptotes = []
  let lastVal = fn(min)

  for (let t = min; t <= max; t += step) {
    const f_t = fn(t)
    console.log({ t, step })
    // since step size is so small, we can find the value that flips the output,
    // and present it as the asymptote
    if (
      f_t < 0 !== lastVal < 0 && // fn(t) has switched signs
      Math.abs(f_t - lastVal) > 2 * scale[1] // i.e. is approaching infinity
    ) {
      // and plot a line there
      asymptotes.push(
        <Line
          key={`asymptote-${t}`}
          start={[t, range[1][0]]}
          end={[t, range[1][1]]}
        />
      )
    }

    lastVal = f_t
  }

  const [, yUnit] = GraphUtils.scaleGridUnit(range, scale)
  const asymptotesStyle: any = {
    strokeDasharray: 0.25 * yUnit,
    strokeWidth: 3,
    stroke: "#000",
    ...style,
  }
  return <g style={asymptotesStyle}>{asymptotes}</g>
}
