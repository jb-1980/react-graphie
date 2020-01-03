import * as React from "react"
import GraphUtils from "../util/graph-utils"
import { useGraphie } from "../graphie-context"

type lineProps = { start: number[]; end: number[]; style?: {} }
export const Line = ({ start, end, style }: lineProps) => {
  const { range, scale } = useGraphie()
  const [x1, y1] = React.useMemo(
    () => GraphUtils.scalePoint(start, range, scale),
    [start, range, scale]
  )
  const [x2, y2] = React.useMemo(
    () => GraphUtils.scalePoint(end, range, scale),
    [end, range, scale]
  )
  return <line x1={x1} x2={x2} y1={y1} y2={y2} style={style} />
}
