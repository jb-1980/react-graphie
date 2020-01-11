import * as React from "react"
import { useGraphie } from "../graphie-context"
import { normalizeTheta, cartFromPolarRad } from "../util/math/vector"
import { scalePoint, scaleVector } from "../util/svg-math"

type propTypes = {
  center: number[]
  radius: number
  startAngle: number
  endAngle: number
  sector: boolean
  angleInRadians?: boolean
  style?: {}
}
export const Arc = ({
  center,
  radius,
  startAngle,
  endAngle,
  sector,
  angleInRadians = true,
  style,
}: propTypes) => {
  const { range, scale } = useGraphie()

  let angles = angleInRadians
    ? [startAngle, endAngle]
    : [(startAngle * Math.PI) / 180, (endAngle * Math.PI) / 180]
  // let _startAngle = ((startAngle % 360) + 360) % 360
  // let _endAngle = ((endAngle % 360) + 360) % 360
  let _startAngle = normalizeTheta(angles[0])[1]
  let _endAngle = normalizeTheta(angles[1])[1]

  const cent = scalePoint(center, range, scale)
  const radii = scaleVector(radius, range, scale)
  const startVector = cartFromPolarRad(radius, _startAngle)
  const endVector = cartFromPolarRad(radius, _endAngle)

  const startPoint = scalePoint(
    [center[0] + startVector[0], center[1] + startVector[1]],
    range,
    scale
  )
  const endPoint = scalePoint(
    [center[0] + endVector[0], center[1] + endVector[1]],
    range,
    scale
  )

  const largeAngle = normalizeTheta(_endAngle - _startAngle)[1] > Math.PI

  const path = `M${startPoint.join()}A${radii.join()} 0 ${
    largeAngle ? 1 : 0
  } 0 ${endPoint.join()}${sector ? "L" + cent.join(" ") + "z" : ""}`

  return <path className="graphie-arc" d={path} style={style} />
}
