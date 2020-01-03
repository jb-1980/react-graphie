import * as React from "react"
import { vector } from "kmath"

import { Line } from "./line"
import KhanColors from "../util/colors"
import GraphUtils from "../util/graph-utils"
import { useGraphie } from "../graphie-context"

type tickMarkProps = { style?: {} }
export const TickMarks = ({ style }: tickMarkProps) => {
  const {
    isMobile,
    tickOpacity,
    tickLen,
    tickStep,
    scale,
    axisCenter,
    gridStep,
    range,
    axisArrows,
  } = useGraphie()
  const halfWidthTicks = isMobile
  let tickStyle = {
    stroke: isMobile ? KhanColors.GRAY_G : "#000000",
    opacity: isMobile ? 1 : tickOpacity,
    strokeWidth: 1,
    ...style,
  }

  // set up some basic mesuarements
  const xLen = tickLen[0] / 2
  const xStep = gridStep[0] * tickStep[0]
  const yLen = tickLen[1] / 2
  const yStep = gridStep[1] * tickStep[1]

  const startArrow = ["<->", "<-", true].includes(axisArrows)
  const endArrow = ["<->", "->", true].includes(axisArrows)
  const [axisCenterX, axisCenterY] = axisCenter
  const ticks = []

  // horizontal ticks
  for (let x = xStep + axisCenterX; x <= range[0][1]; x += xStep) {
    if (x < range[0][1] - 1 / 3 || !endArrow) {
      // arrowhead is 1/3 unit
      ticks.push(
        <Line
          key={`x-tick-mark-${x}`}
          start={[x, -xLen + axisCenterY]}
          end={[x, xLen + axisCenterY]}
          style={tickStyle}
        />
      )
    }
  }

  for (let x = -xStep + axisCenterX; x >= range[0][0]; x -= xStep) {
    if (x > range[0][0] + 1 / 3 || !startArrow) {
      // arrowhead is 1/3 unit
      ticks.push(
        <Line
          key={`x-tick-mark-${x}`}
          start={[x, -xLen + axisCenterY]}
          end={[x, xLen + axisCenterY]}
          style={tickStyle}
        />
      )
    }
  }

  // vertical axis

  for (let y = yStep + axisCenterY; y <= range[1][1]; y += yStep) {
    if (y < range[1][1] - 1 / 3 || !endArrow) {
      // arrowhead is 1/3 unit
      ticks.push(
        <Line
          key={`y-tick-mark-${y}`}
          start={[-yLen + axisCenterX, y]}
          end={[yLen + axisCenterX, y]}
          style={tickStyle}
        />
      )
    }
  }

  for (let y = -yStep + axisCenterY; y >= range[1][0]; y -= yStep) {
    if (y > range[1][0] + 1 / 3 || !startArrow) {
      // arrowhead is 1/3 unit
      ticks.push(
        <Line
          key={`y-tick-mark-${y}`}
          start={[-yLen + axisCenterX, y]}
          end={[yLen + axisCenterX, y]}
          style={tickStyle}
        />
      )
    }
  }

  return <g id="graphie-tick-marks">{ticks}</g>
}
