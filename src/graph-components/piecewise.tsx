import * as React from "react"
import GraphUtils from "../util/graph-utils"
import { useGraphie } from "../graphie-context"
import { Parametric } from "./parametric"

type propTypes = {
  fnArray: Array<(x: number) => number>
  // rangeArray?: number[][] TODO: figure out if rangeArray is really necessary
  style?: {}
}
export const Piecewise = ({ fnArray, /*rangeArray,*/ style }: propTypes) => {
  const paths = fnArray.map((fn, i) => {
    return <Parametric key={`piecewise-${i}`} fn={x => [x, fn(x)]} />
  })

  return <g style={style}>{paths}</g>
}
