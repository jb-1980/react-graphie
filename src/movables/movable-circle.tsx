import * as React from "react"
import {MovablePoint} from "./movable-point"
import { Circle } from "../graph-components"
import KhanColors from "../util/colors"

export const MovableCircle = ({ radius, setRadius, center, setCenter }) => {
  const [draggableRadius, setDraggableRadius] = React.useState([
    radius,
    center[1],
  ])

  const updateDraggableRadius = (p: number[]) => {
    let vector = [p[0] - center[0], p[1] - center[1]]
    setRadius(Math.sqrt(vector[0] * vector[0] + vector[1] * vector[1]))
    setDraggableRadius(p)
  }

  const updateDraggableCenter = (p: number[]) => {
    let _draggableRadius = [
      draggableRadius[0] - center[0] + p[0],
      draggableRadius[1] - center[1] + p[1],
    ]
    setDraggableRadius(_draggableRadius)
    setCenter(p)
  }

  return (
    <>
      <Circle
        center={center}
        radius={radius}
        style={{ stroke: KhanColors.BLUE }}
      />
      <MovablePoint point={draggableRadius} setPoint={updateDraggableRadius} />
      <MovablePoint point={center} setPoint={updateDraggableCenter} />
    </>
  )
}
