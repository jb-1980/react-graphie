import * as React from "react"
import KhanColors from "../util/colors"
import { useGraphie } from "../graphie-context"
import { unscalePoint, scalePoint, snapCoord } from "../util/svg-math"

type propTypes = {
  axis: number
  setAxis: (a: number) => any
  snap?: number[]
  vertical?: boolean
  style?: {}
}
export const MovableAsymptote = ({
  axis,
  setAxis,
  snap,
  vertical = false,
  style,
}: propTypes) => {
  const {
    range,
    scale,
    isDragging,
    setIsDragging,
    mouseMove,
    snap: graphSnap,
  } = useGraphie()

  let ref = React.useRef()

  React.useEffect(() => {
    if (isDragging === ref.current && mouseMove) {
      let { offsetX, offsetY } = mouseMove.nativeEvent

      let point = unscalePoint([offsetX, offsetY], range, scale)
      let [x, y] = snapCoord(point, snap ? snap : graphSnap)
      setAxis(vertical ? x : y)
    }
  }, [isDragging, mouseMove, graphSnap, range, scale, setAxis, snap, vertical])

  const onMouseDown = () => setIsDragging(ref.current)
  let start = vertical ? [axis, range[1][0]] : [range[0][0], axis]
  let end = vertical ? [axis, range[1][1]] : [range[0][1], axis]

  let [x1, y1] = scalePoint(start, range, scale)
  let [x2, y2] = scalePoint(end, range, scale)

  let asymptoteStyle = {
    stroke: KhanColors.PINK,
    strokeWidth: 3,
    cursor: "move",
    ...style,
  }
  return (
    <line
      onMouseDown={onMouseDown}
      ref={ref}
      x1={x1}
      x2={x2}
      y1={y1}
      y2={y2}
      style={asymptoteStyle}
    />
  )
}
