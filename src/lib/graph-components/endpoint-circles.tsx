import React from "react"
import { Circle } from "./primitives"

type propTypes = {
  endpointArray: { point: number[]; open: boolean }[]
  style?: { [key: string]: any }
}
export const EndpointCircles = ({ endpointArray, style }: propTypes) => {
  const circles = endpointArray.map((coord, i) => {
    let circleStyle = {
      ...style,
      stroke: !coord.open ? "none" : style?.stroke,
      fill: coord.open ? "#fff" : style?.fill,
    }
    return (
      <Circle
        key={`endpoint-circle-${i}`}
        center={coord.point}
        radius={0.25}
        style={circleStyle}
      />
    )
  })

  return <g>{circles}</g>
}
