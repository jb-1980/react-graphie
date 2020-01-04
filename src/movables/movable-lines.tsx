import * as React from "react"
import { MovablePoint } from "./movable-point"
import { Line } from "../graph-components"
import KhanColors from "../util/colors"
import GraphUtils from "../util/graph-utils"
import { useGraphie } from "../graphie-context"

type segmentTypes = {
  point1: number[]
  point2: number[]
  setPoint1: (p: number[]) => void
  setPoint2: (p: number[]) => void
  style?: {}
}
export const MovableLineSegment = ({
  point1,
  point2,
  setPoint1,
  setPoint2,
  style,
}: segmentTypes) => {
  return (
    <g style={style}>
      <Line start={point1} end={point2} />
      <MovablePoint point={point1} setPoint={setPoint1} />
      <MovablePoint point={point2} setPoint={setPoint2} />
    </g>
  )
}

type rayTypes = {
  point1: number[]
  point2: number[]
  setPoint1: (p: number[]) => void
  setPoint2: (p: number[]) => void
  style?: {}
}
export const MovableLineRay = ({
  point1,
  point2,
  setPoint1,
  setPoint2,
  style,
}) => {
  const {
    range: [xrange, yrange],
  } = useGraphie()
  // need to extend the line beyond the view, so points have to be modified to be
  // collinear and far away.
  let [m, b] = GraphUtils.getSlopeIntercept(point1, point2)

  const y = x => m * x + b
  let end, ycoord
  if (point1[0] <= point2[0]) {
    if (Math.abs(m) === Infinity) {
      ycoord = point2[1] < point1[1] ? yrange[0] : yrange[1]
      end = [point2[0], ycoord]
    } else {
      end = [xrange[1], y(xrange[1])]
    }
  } else {
    end = [xrange[0], y(xrange[0])]
  }

  return (
    <g style={style}>
      <Line start={point1} end={end} />
      <MovablePoint point={point1} setPoint={setPoint1} />
      <MovablePoint point={point2} setPoint={setPoint2} />
    </g>
  )
}

type lineTypes = {
  point1: number[]
  point2: number[]
  setPoint1: (p: number[]) => void
  setPoint2: (p: number[]) => void
  style?: {}
}
export const MovableLine = ({
  point1,
  point2,
  setPoint1,
  setPoint2,
  style,
}: lineTypes) => {
  const {
    range: [xrange, yrange],
  } = useGraphie()
  // need to extend the line beyond the view, so points have to be modified to be
  // collinear and far away.
  let [m, b] = GraphUtils.getSlopeIntercept(point1, point2)

  const y = x => m * x + b

  let [start, end] =
    m === Infinity // return points for vertical line
      ? [
          [point1[0], yrange[0]],
          [point1[0], yrange[1]],
        ]
      : [
          [xrange[0], y(xrange[0])],
          [xrange[1], y(xrange[1])],
        ]

  return (
    <g style={style}>
      <Line start={start} end={end} />
      <MovablePoint point={point1} setPoint={setPoint1} />
      <MovablePoint point={point2} setPoint={setPoint2} />
    </g>
  )
}
