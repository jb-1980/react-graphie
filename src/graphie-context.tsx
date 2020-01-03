import * as React from "react"
import { Grid, Axes, TickMarks, Labels } from "./graph-components"
import GraphUtils from "./util/graph-utils"
import { processMath } from "./util/tex.js"

const defaultOptions = {
  range: [
    [-10, 10],
    [-10, 10],
  ],
  scale: [500, 500],
  grid: true,
  gridOpacity: 0.1,
  gridStep: [1, 1],
  axes: true,
  axisCenter: [0, 0],
  axisOpacity: 1.0,
  axisLabels: [],
  tickMarks: true,
  tickStep: [2, 2],
  tickLen: [0.5, 0.5],
  tickOpacity: 1.0,
  labelStep: [1, 1],
  yLabelFormat: y => y,
  xLabelFormat: x => x,
  isDragging: false, // Consumed by movables to decide when to update
  setIsDragging: x => x, // Consumed by movables to begin a movable event
  mouseMove: null, // Consumed by movables, usually to get the position
  setMouseMove: x => null,
}
const Context = React.createContext(defaultOptions)

type propTypes = {
  options: {
    range?: number[][] | number[] | number
    scale?: number[] | number
    grid?: boolean
    gridOpacity?: number // (0 - 1)
    gridStep?: number[] | number // relative to units
    axes?: boolean
    axisArrows?: string | boolean
    axisOpacity?: number
    axisCenter?: number[]
    axisLabels?: string[]
    tickMarks?: boolean
    tickStep?: number[] | number // relative to grid steps
    tickLen?: number[] | number // in pixels
    tickOpacity?: number
    labels?: boolean
    labelStep?: number[] | number // relative to tickSteps
    yLabelFormat?: (l: string | number) => string // fn to format label string for y-axis
    xLabelFormat?: (l: string | number) => string // fn to formate label string for x-axis
    smartLabelPositioning?: boolean // should ignore minus sign?
  }
  children: any
}

const GraphieProvider = ({ options, children }: propTypes) => {
  // some updates to props to allow for shorthanding ranges and the like
  const cleanedOptions: any = Object.entries({
    ...defaultOptions,
    ...options,
  }).reduce((acc, [prop, val]) => {
    // for an option that does not be cleaned, make sure it gets to the acc
    acc[prop] = val

    if (
      !prop.match(/.*Opacity$/) && // don't set gridOpacity
      prop !== "range" &&
      typeof val === "number"
    ) {
      acc[prop] = [val, val]
    }

    // allow symmetric ranges to be specified by the absolute values
    if (prop === "range" || prop === "gridRange") {
      if (Array.isArray(val)) {
        // but don't mandate symmetric ranges
        if (!Array.isArray(val[0])) {
          acc[prop] = [
            [-val[0], val[0]],
            [-val[1], val[1]],
          ]
        }
      } else if (typeof val === "number") {
        acc[prop] = [
          [-val, val],
          [-val, val],
        ]
      }
    }
    return acc
  }, {})

  // set up axis labels
  const {
    scale,
    grid,
    axes,
    tickMarks,
    labels,
    range,
    axisCenter,
    axisLabels,
  } = cleanedOptions
  let axisCenterX: number, axisCenterY: number
  let xUnit: number, yUnit: number
  let rangeShift: number, domainShift: number
  let domainLabel = ""
  let rangeLabel = ""
  if (axisLabels.length === 2) {
    let gridUnits = GraphUtils.scaleGridUnit(range, scale)
    xUnit = gridUnits[0]
    yUnit = gridUnits[1]
    let center = GraphUtils.scaleAxisCenter(axisCenter, range, scale)
    axisCenterX = center[0]
    axisCenterY = center[1]
    domainLabel = processMath(axisLabels[0])
    rangeLabel = processMath(axisLabels[1])
    domainShift = axisCenterX - yUnit / 2
    rangeShift = axisCenterY - xUnit / 2
  }

  // mouse functions for movable components to consume
  let [isDragging, setIsDragging] = React.useState(false)
  let [mouseMove, setMouseMove] = React.useState(null)

  const onMouseMove = (e: React.MouseEvent) => {
    if (isDragging) {
      e.persist()
      setMouseMove(e)
    }
  }

  const onMouseUp = () => {
    setIsDragging(false)
    setMouseMove(null)
  }
  return (
    <Context.Provider
      value={{
        ...cleanedOptions,
        isDragging,
        setIsDragging,
        mouseMove,
        setMouseMove,
      }}
    >
      <div>
        <div
          style={{
            width: scale[0],
            marginLeft: rangeShift,
            padding: "5px 0",
            userSelect: "none",
          }}
          dangerouslySetInnerHTML={{ __html: rangeLabel }}
        />
        <div style={{ display: "flex" }}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            version="1.1"
            width={scale[0]}
            height={scale[1]}
            style={{ stroke: "#000", strokeWidth: 3 }}
            onMouseMove={onMouseMove}
            onMouseUp={onMouseUp}
          >
            {grid && <Grid />}
            {axes && <Axes />}
            {tickMarks && <TickMarks />}
            {labels && <Labels />}
            {children}
          </svg>
          <div
            style={{
              marginTop: domainShift,
              padding: "0 5px",
              userSelect: "none",
            }}
            dangerouslySetInnerHTML={{ __html: domainLabel }}
          />
        </div>
      </div>
    </Context.Provider>
  )
}

type graphieType = {
  range: number[][]
  scale: number[]
  grid: boolean
  gridOpacity: number // (0 - 1)
  gridStep: number[] // relative to units
  axes: boolean
  axisArrows?: string | boolean
  axisOpacity?: number
  axisCenter: number[]
  axisLabels?: string[]
  tickMarks?: boolean
  tickStep: number[] // relative to grid steps
  tickLen: number[] // in pixels
  tickOpacity?: number
  labels?: boolean
  labelStep: number[] // relative to tickSteps
  labelOpacity?: number
  unityLabels?: boolean[] // include -1 on labels
  yLabelFormat?: (l: string | number) => string // fn to format label string for y-axis
  xLabelFormat?: (l: string | number) => string // fn to formate label string for x-axis
  smartLabelPositioning?: boolean // should ignore minus sign?
  isMobile?: boolean
  isDragging: boolean // Consumed by movables to decide when to update
  setIsDragging: (x: boolean) => any // Consumed by movables to begin a movable event
  mouseMove: React.MouseEvent // Consumed by movables, usually to get the position
  setMouseMove: (x: React.MouseEvent | null) => null // Consumed by movable to reset mousemove
}
const useGraphie = () => {
  const graphie: graphieType = React.useContext(Context)

  if (graphie === undefined) {
    throw Error("useGraphie must be used in a GraphieProvider")
  }
  return graphie
}

export { GraphieProvider, useGraphie }
