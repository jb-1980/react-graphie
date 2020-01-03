import * as React from "react"
import GraphUtils from "../util/graph-utils"
import { useGraphie } from "../graphie-context"
import { Path } from "./path"

type propTypes = {
  points: number[][]
  style?: {}
}
export const Polygon = ({ points, style }: propTypes) => {
  return <Path points={points} closed={true} style={style} />
}
