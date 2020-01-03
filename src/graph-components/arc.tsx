import * as React from "react"
import { useGraphie } from "../graphie-context"
import GraphUtils from "../util/graph-utils"

type propTypes = {
  center: number[]
  radius: number
  startAngle: number
  endAngle: number
  sector: boolean
  style?: {}
}
export const Arc = ({
  center,
  radius,
  startAngle,
  endAngle,
  sector,
  style,
}: propTypes) => {
  const { range, scale } = useGraphie()

  let _startAngle = ((startAngle % 360) + 360) % 360
  let _endAngle = ((endAngle % 360) + 360) % 360

  const cent = GraphUtils.scalePoint(center, range, scale)
  const radii = GraphUtils.scaleVector(radius, range, scale)
  const startVector = GraphUtils.polar(radius, _startAngle)
  const endVector = GraphUtils.polar(radius, _endAngle)

  const startPoint = GraphUtils.scalePoint(
    [center[0] + startVector[0], center[1] + startVector[1]],
    range,
    scale
  )
  const endPoint = GraphUtils.scalePoint(
    [center[0] + endVector[0], center[1] + endVector[1]],
    range,
    scale
  )

  const largeAngle = (((_endAngle - _startAngle) % 360) + 360) % 360 > 180

  const path =
    "M" +
    startPoint.join(" ") +
    "A" +
    radii.join(" ") +
    " 0 " + // ellipse rotation
    (largeAngle ? 1 : 0) +
    " 0 " + // sweep flag
    endPoint.join(" ") +
    (sector ? "L" + cent.join(" ") + "z" : "")

  const arcStyle = {
    fill: "none",
    stroke: "#000",
    ...style,
  }
  return <path d={path} style={arcStyle} />
}
