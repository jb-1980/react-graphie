import * as React from "react"

import GraphUtils from "../util/graph-utils"
import { useGraphie } from "../graphie-context"

type circleProps = {
  center: number[]
  radius: number
  style?: {}
}
export const Circle = ({ center, radius, style }: circleProps) => {
  const { range, scale, axisCenter } = useGraphie()

  let _center = center.map((c, i) => c + axisCenter[i])
  let scaledCenter = GraphUtils.scalePoint(_center, range, scale)
  let scaledRadius = (radius * scale[0]) / (range[0][1] - range[0][0])

  let circleStyle = {
    fill: "none",
    stroke: "black",
    strokeWidth: 2,
    overflow: "hidden",
    ...style,
  }
  return (
    <circle
      cx={scaledCenter[0]}
      cy={scaledCenter[1]}
      r={scaledRadius}
      style={circleStyle}
    />
  )
}
