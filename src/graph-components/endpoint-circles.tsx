import * as React from "react"
import { Circle } from "./circle"

type propTypes = {
  endpointArray: number[][]
  style?: {}
}
export const EndpointCircles = ({ endpointArray, style }: propTypes) => {
  const circles = endpointArray.map((coord, i) => (
    <Circle
      key={`endpoint-circle-${i}`}
      center={coord}
      radius={0.25}
      style={style}
    />
  ))

  return <g>{circles}</g>
}
