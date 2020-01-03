import * as React from "react"
import { vector } from "kmath"

import GraphUtils from "../util/graph-utils"
import { useGraphie } from "../graphie-context"
import { Line } from "./line"

type axesProps = {
  style?: {}
}
export const Axes = ({ style }: axesProps) => {
  const {
    range, // x, y ranges of graph, in graph units
    scale, // x, y range of graph in pixels
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
    axisStyle.markerEnd = 'URL("#x-axis-arrowhead")'
    axisStyle.markerStart = 'URL("#x-axis-arrowhead")'
  } else if (axisArrows === "->") {
    axisStyle.markerEnd = 'URL("#x-axis-arrowhead")'
  } else if (axisArrows === "<-") {
    axisStyle.markerStart = 'URL("#x-axis-arrowhead")'
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

  const [arrowHeadX, arrowHeadY] = vector.scale(
    GraphUtils.scaleGridUnit(range, scale),
    1 / 3
  )

  return (
    <g id="graphie-axes">
      <defs>
        {/* <!-- arrowhead marker definition --> */}
        <marker
          id="x-axis-arrowhead"
          viewBox={`0 0 ${arrowHeadX} ${arrowHeadX}`}
          refX={arrowHeadX - 1}
          refY={arrowHeadX / 2}
          markerWidth={arrowHeadX * 0.6}
          markerHeight={arrowHeadX * 0.6}
          orient="auto-start-reverse"
        >
          <path
            d={`M 0 0 L ${arrowHeadX}  ${arrowHeadX / 2} L 0 ${arrowHeadX} z`}
            style={{ stroke: "none" }}
          />
        </marker>
      </defs>
      {axes}
    </g>
  )
}
