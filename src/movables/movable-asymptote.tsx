import * as React from "react"
import KhanColors from "../util/colors"
import { useGraphie } from "../graphie-context"
import GraphUtils from "../util/graph-utils"

type propTypes = {
  axis: number
  setAxis: (a: number) => any
  vertical?: boolean
  style?: {}
}
export const MovableAsymptote = ({
  axis,
  setAxis,
  vertical = false,
  style,
}: propTypes) => {
  const { range, scale, isDragging, setIsDragging, mouseMove } = useGraphie()

  let ref = React.useRef()

  React.useEffect(() => {
    if (isDragging === ref.current && mouseMove) {
      let { offsetX, offsetY } = mouseMove.nativeEvent

      let [x, y] = GraphUtils.unscalePoint([offsetX, offsetY], range, scale)
      setAxis(vertical ? x : y)
    }
  }, [isDragging, mouseMove])

  const onMouseDown = () => setIsDragging(ref.current)
  let start = vertical ? [axis, range[1][0]] : [range[0][0], axis]
  let end = vertical ? [axis, range[1][1]] : [range[0][1], axis]

  let [x1, y1] = GraphUtils.scalePoint(start, range, scale)
  let [x2, y2] = GraphUtils.scalePoint(end, range, scale)

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
