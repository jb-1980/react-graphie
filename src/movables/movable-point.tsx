import * as React from "react"
import GraphUtils from "../util/graph-utils"
import { useGraphie } from "../graphie-context"
import KhanColors from "../util/colors"

type propType = {
  point: number[]
  setPoint: (p: number[]) => any
  style?: any
}
export const MovablePoint = ({ point, setPoint, style }: propType) => {
  const {
    range,
    scale,
    axisCenter,
    isDragging,
    setIsDragging,
    mouseMove,
  } = useGraphie()

  let ref = React.useRef()

  React.useEffect(() => {
    if (isDragging === ref.current && mouseMove) {
      let { offsetX, offsetY } = mouseMove.nativeEvent
      let _point = GraphUtils.unscalePoint([offsetX, offsetY], range, scale)
      setPoint(_point)
    }
  }, [isDragging, mouseMove])

  const onMouseDown = () => setIsDragging(ref.current)
  let _center = point.map((c, i) => c + axisCenter[i])
  let scaledCenter = GraphUtils.scalePoint(_center, range, scale)
  let scaledRadius = (0.25 * scale[0]) / (range[0][1] - range[0][0])

  let circleStyle = {
    fill: KhanColors.PINK,
    stroke: "transparent",
    strokeWidth: 5,
    pointerEvents: "all",
    ...style,
  }
  return (
    <circle
      ref={ref}
      onMouseDown={onMouseDown}
      cx={scaledCenter[0]}
      cy={scaledCenter[1]}
      r={scaledRadius}
      style={circleStyle}
    />
  )
}
