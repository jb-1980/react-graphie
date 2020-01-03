import * as React from "react"

import KhanColors from "../util/colors"
import GraphUtils from "../util/graph-utils"
import { useGraphie } from "../graphie-context"
import { Line } from "./line"

type gridProps = { style?: {} }
export const Grid = ({ style }: gridProps) => {
  const { range, gridStep, gridOpacity, isMobile } = useGraphie()
  const grid = []

  // horizontal grid
  for (let x = Math.ceil(range[0][0]); x <= range[0][1]; x += gridStep[0]) {
    grid.push(
      <Line
        key={`x-range-${x}`}
        start={[x, range[1][1]]}
        end={[x, range[1][0]]}
      />
    )
  }

  // vertical grid

  for (let y = Math.ceil(range[1][0]); y <= range[1][1]; y += gridStep[1]) {
    grid.push(
      <Line
        key={`y-range-${y}`}
        start={[range[0][0], y]}
        end={[range[0][1], y]}
      />
    )
  }

  let gridStyle = {
    stroke: isMobile ? KhanColors.GRAY_C : "#000000",
    opacity: isMobile ? 1 : gridOpacity,
    strokeWidth: isMobile ? 1 : 2,
    ...style,
  }
  return (
    <g id="graphie-grid" style={gridStyle}>
      {grid}
    </g>
  )
}
