import * as React from "react"
import * as ReactDOM from "react-dom"

import { GraphieProvider } from "./graphie-context"
import {
  MovableAsymptote,
  MovableCircle,
  MovableExponential,
  MovableLine,
  MovableLineRay,
  MovableLineSegment,
  MovablePoint,
  MovableParabola,
  MovableSinusoid,
  MovableTangent,
  MovableLogarithmic,
  MovableAbsoluteValue,
} from "./movables"
import KhanColors from "./util/colors"
import {
  Arc,
  Asymptotes,
  Circle,
  Ellipse,
  EndpointCircles,
  Exponential,
  Line,
  Logarithmic,
  Parabola,
  Parametric,
  Path,
  Piecewise,
  Plot,
  Polar,
  Polygon,
  Rect,
  Sinusoid,
} from "./graph-components"

import "./styles.css"

const TestArc = () => (
  <Arc
    center={[1, 1]}
    radius={5}
    startAngle={0}
    endAngle={270}
    sector={false}
    style={{
      stroke: KhanColors.LIGHT_RED,
      strokeWidth: 3,
    }}
  />
)

const TestAsymptotes = () => (
  <Asymptotes key="test-asymptote" fn={x => (1 + 5 * x) / (x - 1)} />
)

const TestCircle = () => (
  <Circle center={[-3, 5]} radius={4} style={{ stroke: KhanColors.GREEN }} />
)

const TestEllipse = () => (
  <Ellipse
    center={[5, -1]}
    radii={[4, 2]}
    style={{ stroke: KhanColors.MAROON_C, strokeWidth: 3 }}
  />
)

const TestEndpointCircles = () => (
  <EndpointCircles
    endpointArray={[
      [-8, 8],
      [8, -8],
    ]}
    style={{ stroke: "none", fill: KhanColors.TEAL_D }}
  />
)

const TestExponential = () => (
  <Exponential
    a={0.5}
    b={Math.E}
    h={-1}
    k={3}
    style={{ stroke: KhanColors.TEAL_D }}
  />
)

const TestLine = () => (
  <Line
    start={[-8, 8]}
    end={[8, -8]}
    style={{ stroke: KhanColors.BLUE, strokeWidth: 3 }}
  />
)

const TestLogarithmic = () => (
  <Logarithmic a={1} b={2} h={-1} k={3} style={{ stroke: KhanColors.TEAL_D }} />
)

const TestParabola = () => (
  <Parabola a={1} b={3} c={4} style={{ stroke: KhanColors.RED_D }} />
)

const TestParametric = () => (
  <Parametric
    fn={x => [x, (1 + 5 * x) / (x - 1)]}
    style={{
      stroke: KhanColors.PINK,
      strokeWidth: 3,
    }}
  />
)

const TestPath = () => (
  <Path
    points={[
      [-9, 0],
      [0, -9],
      [9, 0],
      [0, 9],
    ]}
    style={{ stroke: KhanColors.MINT_C }}
  />
)

// TODO: work on domain switches
const TestPiecewise = () => (
  <Piecewise
    fnArray={[x => 3 * x - 4, t => 4 * t * t - 7]}
    style={{ stroke: KhanColors.PURPLE_D }}
  />
)

// TODO: work on shading
const TestPlot = () => (
  <Plot
    fn={x => 3 * Math.E ** x}
    range={[-10, 10]}
    swapAxes={false}
    shade={true}
  />
)

// TODO: Not quite working
const TestPolar = () => (
  <Polar fn={Θ => [Θ, 1 - Math.sin(Θ)]} style={{ stroke: KhanColors.ORANGE }} />
)

const TestPolygon = () => (
  <Polygon
    points={[
      [0, 8],
      [-8, 5],
      [-4, -6],
      [4, -6],
      [8, 5],
    ]}
    style={{ fill: KhanColors.KA_BLUE, opacity: 0.6 }}
  />
)

const TestRect = () => (
  <Rect
    x={-8}
    y={4}
    width={10}
    height={12}
    style={{
      fill: KhanColors.PURPLE_D,
      stroke: KhanColors.PURPLE_E,
      strokeWidth: 5,
      opacity: 0.5,
      strokeOpacity: 1,
    }}
  />
)

const TestSinusoid = () => (
  <Sinusoid
    a={3}
    b={1}
    c={-Math.PI / 2}
    d={4}
    style={{ stroke: KhanColors.PURPLE }}
  />
)

const TestMovableAbsoluteValue = () => {
  let [vertex, setVertex] = React.useState([0, 0])
  let [point, setPoint] = React.useState([5, 5])
  return (
    <MovableAbsoluteValue
      vertex={vertex}
      setVertex={setVertex}
      point={point}
      setPoint={setPoint}
    />
  )
}
const TestMovablePoint = () => {
  let [point, setPoint] = React.useState([5, 5])
  return <MovablePoint point={point} setPoint={setPoint} />
}

const TestMovableAsymptote = () => {
  let [axis, setAxis] = React.useState(5)
  return <MovableAsymptote axis={axis} setAxis={setAxis} vertical={true} />
}

const TestMovableCircle = () => {
  let [radius, setRadius] = React.useState(4)
  let [center, setCenter] = React.useState([0, 0])
  return (
    <MovableCircle
      center={center}
      radius={radius}
      setCenter={setCenter}
      setRadius={setRadius}
    />
  )
}

const TestMovableExponential = () => {
  let [axis, setAxis] = React.useState(0)
  let [point1, setPoint1] = React.useState([0, 2])
  let [point2, setPoint2] = React.useState([2, 4])
  return (
    <MovableExponential
      axis={axis}
      point1={point1}
      point2={point2}
      setAxis={setAxis}
      setPoint1={setPoint1}
      setPoint2={setPoint2}
    />
  )
}
const TestMovableLine = () => {
  let [point1, setPoint1] = React.useState([-5, 5])
  let [point2, setPoint2] = React.useState([5, -5])
  return (
    <MovableLine
      point1={point1}
      point2={point2}
      setPoint1={setPoint1}
      setPoint2={setPoint2}
      style={{ stroke: KhanColors.BLUE }}
    />
  )
}
const TestMovableLineRay = () => {
  let [point1, setPoint1] = React.useState([-5, -5])
  let [point2, setPoint2] = React.useState([5, 5])
  return (
    <MovableLineRay
      point1={point1}
      point2={point2}
      setPoint1={setPoint1}
      setPoint2={setPoint2}
      style={{ stroke: KhanColors.BLUE }}
    />
  )
}

const TestMovableLineSegment = () => {
  let [point1, setPoint1] = React.useState([-5, 5])
  let [point2, setPoint2] = React.useState([5, -5])
  return (
    <MovableLineSegment
      point1={point1}
      point2={point2}
      setPoint1={setPoint1}
      setPoint2={setPoint2}
      style={{ stroke: KhanColors.BLUE }}
    />
  )
}

const TestMovableLogarithmic = () => {
  let [axis, setAxis] = React.useState(0)
  let [point1, setPoint1] = React.useState([1, 0])
  let [point2, setPoint2] = React.useState([4, 2])
  return (
    <MovableLogarithmic
      axis={axis}
      point1={point1}
      point2={point2}
      setAxis={setAxis}
      setPoint1={setPoint1}
      setPoint2={setPoint2}
    />
  )
}

const TestMovableParabola = () => {
  let [point, setPoint] = React.useState([5, 5])
  let [vertex, setVertex] = React.useState([0, 0])
  return (
    <MovableParabola
      point={point}
      setPoint={setPoint}
      vertex={vertex}
      setVertex={setVertex}
      style={{ stroke: KhanColors.BLUE }}
    />
  )
}

const TestMovableSinusoid = () => {
  let [maxpoint, setMaxpoint] = React.useState([3, 5])
  let [midpoint, setMidpoint] = React.useState([0, 0])

  return (
    <MovableSinusoid
      maxpoint={maxpoint}
      midpoint={midpoint}
      setMaxpoint={setMaxpoint}
      setMidpoint={setMidpoint}
      style={{ stroke: KhanColors.BLUE }}
    />
  )
}

const TestMovableTangent = () => {
  let [point1, setPoint1] = React.useState([3, 5])
  let [point2, setPoint2] = React.useState([0, 0])

  return (
    <MovableTangent
      point1={point1}
      point2={point2}
      setPoint1={setPoint1}
      setPoint2={setPoint2}
      style={{ stroke: KhanColors.BLUE }}
    />
  )
}

function App() {
  const [shapes, setShapes] = React.useState([])
  const [movables, setMovables] = React.useState([])

  const options = {
    axisArrows: "<->",
    gridStep: 1,
    isMobile: false,
    xLabelFormat: (l: string | number) => `\\small{${l}}`,
    yLabelFormat: (l: string | number) => `\\small{${l}}`,
    // axisCenter: [-6, -8],
    axes: true,
    grid: true,
    tickMarks: true,
    tickStep: 1,
    labelStep: 1,
    labels: true,
    axisLabels: ["x", "f(x)"],
    range: [
      [-10, 10],
      [-10, 10],
    ],
    scale: [600, 600],
  }

  const availableShapes = {
    arc: <TestArc key="test-arc" />,
    asymptotes: <TestAsymptotes key="test-asymptotes" />,
    circle: <TestCircle key="test-circle" />,
    ellipse: <TestEllipse key="test-ellipse" />,
    endpointCircles: <TestEndpointCircles key="test-circle" />,
    exponential: <TestExponential key="test-exponential" />,
    line: <TestLine key="test-line" />,
    logarithmic: <TestLogarithmic key="test-logarithmic" />,
    parabola: <TestParabola key="test-parabola" />,
    parametric: <TestParametric key="test-parametric" />,
    path: <TestPath key="test-path" />,
    piecewise: <TestPiecewise key="test-piecewise" />,
    plot: <TestPlot key="test-plot" />,
    polar: <TestPolar key="test-polar" />,
    polygon: <TestPolygon key="test-polygon" />,
    rect: <TestRect key="test-rect" />,
    sinusoid: <TestSinusoid key="test-sinusoid" />,
  }

  const availabeMovables = {
    "absolute value": (
      <TestMovableAbsoluteValue key="test-movable-absolute-value" />
    ),
    asymptote: <TestMovableAsymptote key="test-movable-asymptote" />,
    point: <TestMovablePoint key="test-movable-point" />,
    circle: <TestMovableCircle key="test-movable-circle" />,
    exponential: <TestMovableExponential key="test-movable-exponential" />,
    line: <TestMovableLine key="test-movable-line" />,
    "line ray": <TestMovableLineRay key="test-movable-line ray" />,
    "line segment": <TestMovableLineSegment key="test-movable-line segment" />,
    logarithmic: <TestMovableLogarithmic key="test-movable-logarithmic" />,
    parabola: <TestMovableParabola key="test-movable-parabola" />,
    sinusoid: <TestMovableSinusoid key="test-movable-sinusoid" />,
    tangent: <TestMovableTangent key="test-movable-tangent" />,
  }

  return (
    <div
      style={{
        padding: 30,
        position: "relative",
        border: "thin solid purple",
        display: "flex",
      }}
    >
      <section>
        <GraphieProvider options={options}>
          {shapes.map(c => availableShapes[c])}
          {movables.map(m => availabeMovables[m])}
        </GraphieProvider>
      </section>
      <section>
        <section>
          <h2>Graph Shapes</h2>
          <form>
            {Object.keys(availableShapes).map(name => (
              <div key={name}>
                <label>
                  <input
                    type="checkbox"
                    checked={shapes.includes(name)}
                    onChange={() =>
                      shapes.includes(name)
                        ? setShapes(shapes.filter(c => c !== name))
                        : setShapes([...shapes, name])
                    }
                  />{" "}
                  {name}
                </label>
              </div>
            ))}
          </form>
        </section>
        <section>
          <h2>Graph Movables</h2>
          <form>
            {Object.keys(availabeMovables).map(name => (
              <div key={name}>
                <label>
                  <input
                    type="checkbox"
                    checked={movables.includes(name)}
                    onChange={() =>
                      movables.includes(name)
                        ? setMovables(movables.filter(c => c !== name))
                        : setMovables([...movables, name])
                    }
                  />{" "}
                  {name}
                </label>
              </div>
            ))}
          </form>
        </section>
      </section>
    </div>
  )
}

const rootElement = document.getElementById("root")
ReactDOM.render(<App />, rootElement)
