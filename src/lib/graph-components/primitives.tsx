/* The functions in this file should render the primitive svg elements:
 * path, rect, circle, ellipse, line, polyline, and polygon. All other graphie
 * elements should just consume one of these primatives
 */
import React from "react"
import { useGraphie } from "../graphie-context"
import { scalePoint, scaleVector } from "../util/svg-math"

// I only include path for consistency. I know it could be used without an extra
// React wrapper.
type pathProps = {
  d: string
  style?: {}
}
export const Path = ({ d, style }: pathProps) => <path d={d} style={style} />

type rectPropTypes = {
  x: number
  y: number
  width: number
  height: number
  style?: {}
}
// (x, y) is coordinate of upper left corner
export const Rect = ({ x, y, width, height, style }: rectPropTypes) => {
  const { range, scale } = useGraphie()
  const [_x, _y] = scalePoint([x, y], range, scale)
  const [_width, _height] = scaleVector([width, height], range, scale)

  let rectStyle = {
    fill: "#000",
    fillOpacity: 0.1,
    ...style,
  }
  return (
    <rect x={_x} y={_y} width={_width} height={_height} style={rectStyle} />
  )
}

type circleProps = {
  center: number[]
  radius: number
  style?: {}
}
export const Circle = ({ center, radius, style }: circleProps) => {
  const { range, scale, axisCenter } = useGraphie()

  let _center = center.map((c, i) => c + axisCenter[i])
  let scaledCenter = scalePoint(_center, range, scale)
  let scaledRadius = (radius * scale[0]) / (range[0][1] - range[0][0])

  let circleStyle = {
    fill: "none",
    stroke: "black",
    strokeWidth: 3,
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

type ellipsePropType = {
  center: number[]
  radii: number[]
  style?: {}
}
export const Ellipse = ({ center, radii, style }: ellipsePropType) => {
  const { range, scale } = useGraphie()
  const [cx, cy] = scalePoint(center, range, scale)
  const [rx, ry] = scaleVector(radii, range, scale)

  const ellipseStyle = {
    fill: "#000",
    fillOpacity: 0.1,
    ...style,
  }
  return <ellipse cx={cx} cy={cy} rx={rx} ry={ry} style={ellipseStyle} />
}

type lineProps = { start: number[]; end: number[]; style?: {} }
export const Line = ({ start, end, style }: lineProps) => {
  const { range, scale } = useGraphie()
  const [x1, y1] = React.useMemo(() => scalePoint(start, range, scale), [
    start,
    range,
    scale,
  ])
  const [x2, y2] = React.useMemo(() => scalePoint(end, range, scale), [
    end,
    range,
    scale,
  ])
  return <line x1={x1} x2={x2} y1={y1} y2={y2} style={style} />
}

type polylineProps = {
  points: number[][]
  style?: {}
}
export const Polyline = ({ points, style }: polylineProps) => {
  const { range, scale } = useGraphie()
  const _points = points.map(p => scalePoint(p, range, scale).join())

  let polylineStyle = {
    fill: "none",
    ...style,
  }

  return <polyline points={_points.join(" ")} style={polylineStyle} />
}

type polygonProps = {
  points: number[][]
  style?: {}
}
export const Polygon = ({ points, style }: polygonProps) => {
  const { range, scale } = useGraphie()
  const _points = points.map(p => scalePoint(p, range, scale).join())

  let polygonStyle = {
    fill: "#000",
    fillOpacity: 0.1,
    ...style,
  }

  return <polygon points={_points.join(" ")} style={polygonStyle} />
}
