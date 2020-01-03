import * as React from "react"
import GraphUtils from "../util/graph-utils"
import { useGraphie } from "../graphie-context"
import KhanColors from "../util/colors"

type propType = {
    point: number[],
    setPoint: (p: number[]) => any,
    style?: any,
}
export const MovablePoint = ({ point, setPoint, style }: propType) => {
  const { range, scale, axisCenter } = useGraphie()
  let [isMoving, setIsMoving] = React.useState(false)

  const onMouseDown = () => setIsMoving(true)
  const onMouseUp = () => setIsMoving(false)
  const onMouseMove = (e: React.MouseEvent) => {
    if (isMoving) {
      let { offsetX, offsetY } = e.nativeEvent
      let _point = GraphUtils.unscalePoint([offsetX, offsetY], range, scale)
      setPoint(_point)
    }
  }

  let _center = point.map((c, i) => c + axisCenter[i])
  let scaledCenter = GraphUtils.scalePoint(_center, range, scale)
  let scaledRadius = (0.25 * scale[0]) / (range[0][1] - range[0][0])

  let circleStyle = {
    fill: KhanColors.PINK,
    stroke: "transparent",
    strokeWidth: 20,
    pointerEvents: "all",
    ...style,
  }
  return (
    <circle
      onMouseDown={onMouseDown}
      onMouseUp={onMouseUp}
      onMouseMove={onMouseMove}
      cx={scaledCenter[0]}
      cy={scaledCenter[1]}
      r={scaledRadius}
      style={circleStyle}
    />
  )
}