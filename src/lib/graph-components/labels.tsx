import * as React from "react"

import { processMath } from "../util/tex"
import KhanColors from "../util/colors"
import { scaleGridUnit, scaleAxisCenter, unscalePoint } from "../util/svg-math"
import { useGraphie } from "../graphie-context"

type labelProps = {
  point: number[]
  text: string
  direction: string
  latex?: boolean
  style?: {}
}
export const Label = ({
  point,
  text,
  direction,
  latex = true,
  style,
}: labelProps) => {
  const { range, scale, tickLen } = useGraphie()
  const [xUnit, yUnit] = scaleGridUnit(range, scale)

  let _text = latex ? processMath(text) : text

  const labelDirections: any = {
    center: [-0.5, -0.5],
    above: [-0.5, -1.0],
    "above right": [0.0, -1.0],
    right: [0.0, -0.5],
    "below right": [0.0, 0.0],
    below: [-0.5, tickLen[0] / 4],
    "below left": [-1.0, 0.0],
    left: [-1.0, -0.5],
    "above left": [-1.0, -1.0],
  }

  const multipliers = labelDirections[direction]

  const x = point[0] + xUnit * multipliers[0]
  const y = point[1] + yUnit * multipliers[1]
  const fontSize = `${(2.2 * scale[1]) / 500}ch`

  return (
    <foreignObject
      className="graphie-label"
      x={x}
      y={y}
      width={xUnit}
      height={yUnit}
      style={{
        textAlign: "center",
        overflow: "visible",
        pointerEvents: "none",
      }}
    >
      <span
        dangerouslySetInnerHTML={{ __html: _text }}
        style={{ fontSize, userSelect: "none" }}
      />
    </foreignObject>
  )
}

export const Labels = () => {
  const {
    scale,
    gridStep,
    tickStep,
    labelStep,
    range,
    axisLabels,
    axisCenter,
    axisArrows,
    isMobile,
    labelOpacity,
    unityLabels,
    xLabelFormat,
    yLabelFormat,
  } = useGraphie()
  let style = {
    stroke: isMobile ? KhanColors.GRAY_G : "#000000",
    opacity: isMobile ? 1 : labelOpacity,
  }
  // Lets just set up some values to make the logic easier //

  // how many pixels is one unit
  const xUnit = scale[0] / (range[0][1] - range[0][0])
  const yUnit = scale[1] / (range[1][1] - range[1][0])

  // how many pixels should we jump to set the next label
  const xStep = gridStep[0] * tickStep[0] * labelStep[0] * xUnit
  const yStep = gridStep[1] * tickStep[1] * labelStep[1] * yUnit

  // scale center from units to pixels
  const [axisCenterX, axisCenterY] = scaleAxisCenter(axisCenter, range, scale)
  // how should we render our labels if axis is off center
  const xAxisPosition = axisCenter[0] < 0 ? "above" : "below"
  const yAxisPosition = axisCenter[0] < 0 ? "right" : "left"
  const xShowZero = axisCenter[0] === 0 && axisCenter[1] !== 0
  const yShowZero = axisCenter[0] !== 0 && axisCenter[1] === 0
  const axisOffCenter = axisCenter[0] !== 0 || axisCenter[1] !== 0
  const showUnityX = unityLabels ? unityLabels[0] : axisOffCenter
  const showUnityY = unityLabels ? unityLabels[1] : axisOffCenter

  // if there are arrowheads on our axes, we don't want to place a label over it
  const startArrow = ["<->", "<-", true].includes(axisArrows)
  const endArrow = ["<->", "->", true].includes(axisArrows)

  // minus sign moves text just right of center of tickmark
  const negativeShiftCorrection = (6 / 500) * scale[0]

  // store our labels here to render later
  const labels = []

  // positive x-axis
  for (
    let x = (xShowZero ? 0 : xStep) + axisCenterX;
    x <= scale[0];
    x += xStep
  ) {
    if (x < scale[0] - 10 || !endArrow) {
      let l = unscalePoint(x, range, scale)[0]
      // arrowhead is 10px
      labels.push(
        <Label
          key={`x-label-${x}`}
          point={[x, axisCenterY]}
          text={xLabelFormat(l)}
          direction={xAxisPosition}
          style={style}
        />
      )
    }
  }

  // negative x-axis
  for (
    let x = -xStep * (showUnityX ? 1 : 2) + axisCenterX;
    x >= 0;
    x -= xStep
  ) {
    if (x > 10 || !startArrow) {
      let l = unscalePoint(x, range, scale)[0]
      // arrowhead is 10px
      labels.push(
        <Label
          key={`x-label-${x}`}
          point={[x - negativeShiftCorrection, axisCenterY]}
          text={xLabelFormat(l)}
          direction={xAxisPosition}
          style={style}
        />
      )
    }
  }

  // positive y-axis
  for (let y = axisCenterY - (yShowZero ? 0 : yStep); y >= 0; y -= yStep) {
    if (y > 10 || !endArrow) {
      let l = unscalePoint(y, range, scale)[1]
      // arrowhead is 10px
      labels.push(
        <Label
          key={`y-label-${y}`}
          point={[axisCenterX, y]}
          text={yLabelFormat(l)}
          direction={yAxisPosition}
          style={style}
        />
      )
    }
  }

  // negative y-axis
  for (
    let y = yStep * (showUnityY ? 1 : 2) + axisCenterY;
    y <= scale[1];
    y += yStep
  ) {
    if (y < scale[1] - 10 || !startArrow) {
      let l = unscalePoint(y, range, scale)[1]
      // arrowhead is 10px
      labels.push(
        <Label
          key={`y-label-${y}`}
          point={[axisCenterX - negativeShiftCorrection, y]}
          text={yLabelFormat(l)}
          direction={yAxisPosition}
          style={style}
        />
      )
    }
  }

  if (axisLabels.length === 2) {
    labels.push(
      //[gridRange[0][1], axisCenter[1]], axisLabels[0], "right"
      <Label
        key={`x-axis-label`}
        point={[scale[0], axisCenterY]}
        text={axisLabels[0]}
        direction="right"
        style={style}
      />
    )
    labels.push(
      <Label
        key={`y-axis-label`}
        point={[axisCenterX, 0]}
        text={axisLabels[1]}
        direction={"above"}
        style={style}
      />
      //[axisCenter[0], gridRange[1][1]], axisLabels[1], "above"
    )
  }
  return <g id="graphie-labels">{labels}</g>
}

// TYPES //
type labelDirections = {
  center: number[]
  above: number[]
  "above right": number[]
  right: number[]
  "below right": number[]
  below: number[]
  "below left": number[]
  left: number[]
  "above left": number[]
}
