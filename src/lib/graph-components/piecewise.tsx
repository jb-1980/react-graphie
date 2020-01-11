import React from "react"
import { useGraphie } from "../graphie-context"
import { Parametric } from "./parametric"
import { EndpointCircles } from "./endpoint-circles"

type propTypes = {
  fnArray: Array<(x: number) => number>
  rangeArray?: number[][]
  endpoints?: Array<"none" | "open" | "closed">[]
  style?: { [key: string]: any }
}
export const Piecewise = ({
  fnArray,
  rangeArray,
  endpoints,
  style = {},
}: propTypes) => {
  const {
    range: [xrange],
  } = useGraphie()

  let endpointArray = []
  const paths = fnArray.map((fn, i) => {
    let _range = rangeArray ? rangeArray[i] : xrange

    // let's see if we need to add endpoints to this function
    if (endpoints) {
      // just make sure that the arrays match up
      if (endpoints.length !== rangeArray.length) {
        throw TypeError(
          "the endpoints array and rangeArray must be the same length when providing either to the Piecewise component"
        )
      }
      // do we add an endpoint to the start of the function?
      if (endpoints[i][0] !== "none") {
        endpointArray.push({
          point: [_range[0], fn(_range[0])],
          open: endpoints[i][0] === "open",
        })
      }
      // do we add an endpoint to the end of the function?
      if (endpoints[i][1] !== "none") {
        endpointArray.push({
          point: [_range[1], fn(_range[1])],
          open: endpoints[i][1] === "open",
        })
      }
    }
    return (
      <Parametric key={`piecewise-${i}`} range={_range} fn={x => [x, fn(x)]} />
    )
  })

  let _endpoints = endpointArray && (
    <EndpointCircles
      endpointArray={endpointArray}
      style={{ fill: style.stroke, ...style }}
    />
  )
  return (
    <g style={style}>
      {paths}
      {_endpoints}
    </g>
  )
}
