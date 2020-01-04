import * as React from "react"
import GraphUtils from "../util/graph-utils"
import { useGraphie } from "../graphie-context"

type propTypes = {
  points: number[][]
  closed?: boolean
  style?: {}
}
export const Path = ({ points, closed = false, style }: propTypes) => {
  const { range, scale } = useGraphie()
  const path = React.useMemo(
    () => GraphUtils.svgPath(points, range, scale, closed),
    [points, range, scale, closed]
  )

  let pathStyle = {
    fill: "none",
    ...style,
  }
  return <path d={path} style={pathStyle} />
}
