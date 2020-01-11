import React from "react"

import { useGraphie } from "../graphie-context"
import { Line } from "./primitives"

type axesProps = {
  style?: {}
}
export const Axes = ({ style }: axesProps) => {
  const {
    range, // x, y ranges of graph, in graph units
    axisArrows, // string representation of arrows "<->", "->", "<-",
    axisOpacity,
    axisCenter, // displacemnt of center point, in graph units
  } = useGraphie()

  const [axisCenterX, axisCenterY] = axisCenter

  let axisStyle: {
    markerEnd?: string
    markerStart?: string
    stroke: string
    opacity?: number
    strokeWidth: number
  } = {
    stroke: "#000000",
    opacity: axisOpacity,
    strokeWidth: 2,
    ...style,
  }

  if (axisArrows === "<->" || axisArrows === true) {
    axisStyle.markerEnd = 'URL("#open-endpoint")'
    axisStyle.markerStart = 'URL("#open-endpoint")'
  } else if (axisArrows === "->") {
    axisStyle.markerEnd = 'URL("#axis-arrowhead")'
  } else if (axisArrows === "<-") {
    axisStyle.markerStart = 'URL("#axis-arrowhead")'
  }

  const axes = []
  axes.push(
    <Line
      key="x-axis"
      start={[range[0][0], axisCenterY]}
      end={[range[0][1], axisCenterY]}
      style={axisStyle}
    />
  )
  axes.push(
    <Line
      key="y-axis"
      start={[axisCenterX, range[1][0]]}
      end={[axisCenterX, range[1][1]]}
      style={axisStyle}
    />
  )

  return <g id="graphie-axes">{axes}</g>
}
