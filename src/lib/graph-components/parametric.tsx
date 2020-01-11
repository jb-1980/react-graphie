import * as React from "react"
import { subtract } from "../util/math/vector"
import { useGraphie } from "../graphie-context"
import { Polyline } from "./primitives"

type propTypes = {
  fn: (x: number) => number[]
  shade?: boolean
  range?: number[]
  fn2?: (t: number) => number[]
  style?: {}
}
export const Parametric = ({
  fn,
  shade = false,
  range,
  fn2 = t => [t, 0],
  style,
}: propTypes) => {
  const {
    range: [xrange],
    scale,
  } = useGraphie()

  // Note: fn2 should only be set if 'shade' is true, as it denotes
  // the function between which fn should have its area shaded.
  // In general, plotParametric shouldn't be used to shade the area
  // between two arbitrary parametrics functions over an interval,
  // as the method assumes that fn and fn2 are both of the form
  // fn(t) = (t, fn'(t)) for some initial fn'.

  // We truncate to 500,000, since anything bigger causes
  // overflow in the firefox svg renderer.  This is safe
  // since 500,000 is outside the viewport anyway.  We
  // write these functions the way we do to handle undefined.
  const clipper = (xy: number[]) => {
    if (Math.abs(xy[1]) > 500000) {
      return [xy[0], Math.min(Math.max(xy[1], -500000), 500000)]
    }
    return xy
  }
  const clippedFn = (x: number) => clipper(fn(x))
  const clippedFn2 = (x: number) => clipper(fn2(x))

  const min = range ? range[0] : xrange[0]
  const max = range ? range[1] : xrange[1]

  let step = (max - min) / (2 * scale[0])
  if (step === 0) {
    step = 1
  }

  let paths = []
  let points = []
  let lastDiff = subtract(clippedFn(min), clippedFn2(min))

  let lastFlip = min
  for (let t = min; t <= max; t += step) {
    const top = clippedFn(t)
    const bottom = clippedFn2(t)
    const diff = subtract(top, bottom)

    // Find points where it flips
    // Create path that sketches area between the two functions
    if (
      // if there is an asymptote here, meaning that the graph
      // switches signs and has a large difference
      /* eslint-disable no-mixed-operators */
      (diff[1] < 0 !== lastDiff[1] < 0 &&
        Math.abs(diff[1] - lastDiff[1]) > 2 * scale[1]) ||
      /* eslint-enable no-mixed-operators */
      // or the function is undefined
      isNaN(diff[1])
    ) {
      // split the path at this point, and draw it
      if (shade) {
        points.push(top)

        // backtrack to draw paired function
        for (let u = t - step; u >= lastFlip; u -= step) {
          points.push(clippedFn2(u))
        }
        lastFlip = t
      }
      paths.push(
        <Polyline
          key={`parametric-path-${t}`}
          style={{ fill: shade ? "inherit" : "none" }}
          points={points}
        />
      )
      // restart the path, excluding this point
      points = []
      if (shade) {
        points.push(top)
      }
    } else {
      // otherwise, just add the point to the path
      points.push(top)
    }

    lastDiff = diff
  }

  if (shade) {
    // backtrack to draw paired function
    for (let u = max - step; u >= lastFlip; u -= step) {
      points.push(clippedFn2(u))
    }
  }
  paths.push(
    <Polyline
      key="parametric-path"
      style={{ fill: shade ? "inherit" : "none" }}
      points={points}
    />
  )

  let parametricStyles: any = {
    strokeLinejoin: "round",
    strokeLinecap: "round",
    fill: shade ? "#000" : "none",
    fillOpacity: 0.5,
    ...style,
  }

  return <g style={parametricStyles}>{paths}</g>
}
