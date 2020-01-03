import * as React from "react"
import * as ReactDOM from "react-dom"

import { GraphieProvider } from "./graphie-context"
import {
  MovableCircle,
  MovableLine,
  MovableLineRay,
  MovableLineSegment,
  MovablePoint,
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
    arc: <TestArc />,
    asymptotes: <TestAsymptotes />,
    circle: <TestCircle />,
    ellipse: <TestEllipse />,
    endpointCircles: <TestEndpointCircles />,
    exponential: <TestExponential />,
    line: <TestLine />,
    logarithmic: <TestLogarithmic />,
    parabola: <TestParabola />,
    parametric: <TestParametric />,
    path: <TestPath />,
    piecewise: <TestPiecewise />,
    plot: <TestPlot />,
    polar: <TestPolar />,
    polygon: <TestPolygon />,
    rect: <TestRect />,
    sinusoid: <TestSinusoid />,
  }

  const availabeMovables = {
    point: <TestMovablePoint />,
    circle: <TestMovableCircle />,
    line: <TestMovableLine />,
    "line ray": <TestMovableLineRay />,
    "line segment": <TestMovableLineSegment />,
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

const TestArc = () => (
  <Arc
    key="test-arc"
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
  <Circle
    key="test-circle"
    center={[-3, 5]}
    radius={4}
    style={{ stroke: KhanColors.GREEN }}
  />
)

const TestEllipse = () => (
  <Ellipse
    key="test-ellipse"
    center={[5, -1]}
    radii={[4, 2]}
    style={{ stroke: KhanColors.MAROON_C, strokeWidth: 3 }}
  />
)

const TestEndpointCircles = () => (
  <EndpointCircles
    key="test-endpoint-circles"
    endpointArray={[
      [-8, 8],
      [8, -8],
    ]}
    style={{ stroke: "none", fill: KhanColors.TEAL_D }}
  />
)

const TestExponential = () => (
  <Exponential
    key="test-exponential"
    a={0.5}
    b={Math.E}
    h={-1}
    k={3}
    style={{ stroke: KhanColors.TEAL_D }}
  />
)

const TestLine = () => (
  <Line
    key="test-line"
    start={[-8, 8]}
    end={[8, -8]}
    style={{ stroke: KhanColors.BLUE, strokeWidth: 3 }}
  />
)

const TestLogarithmic = () => (
  <Logarithmic
    key="test-logarithmic"
    a={1}
    b={2}
    h={-1}
    k={3}
    style={{ stroke: KhanColors.TEAL_D }}
  />
)

const TestParabola = () => (
  <Parabola
    key="test-parabola"
    a={1}
    b={3}
    c={4}
    style={{ stroke: KhanColors.RED_D }}
  />
)

const TestParametric = () => (
  <Parametric
    key="test-parametric"
    fn={x => [x, (1 + 5 * x) / (x - 1)]}
    style={{
      stroke: KhanColors.PINK,
      strokeWidth: 3,
    }}
  />
)

const TestPath = () => (
  <Path
    key="test-path"
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
    key="test-piecewise"
    fnArray={[x => 3 * x - 4, t => 4 * t * t - 7]}
    style={{ stroke: KhanColors.PURPLE_D }}
  />
)

// TODO: work on shading
const TestPlot = () => (
  <Plot
    key="test-plot"
    fn={x => 3 * Math.E ** x}
    range={[-10, 10]}
    swapAxes={false}
    shade={true}
  />
)

// TODO: Not quite working
const TestPolar = () => (
  <Polar
    key="test-polar"
    fn={Θ => [Θ, 1 - Math.sin(Θ)]}
    style={{ stroke: KhanColors.ORANGE }}
  />
)

const TestPolygon = () => (
  <Polygon
    key="test-polygon"
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
    key="test-rect"
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
    key="test-sinusoid"
    a={3}
    b={1}
    c={-Math.PI / 2}
    d={4}
    style={{ stroke: KhanColors.PURPLE }}
  />
)

const TestMovablePoint = () => {
  let [point, setPoint] = React.useState([5, 5])
  return (
    <MovablePoint key="test-movable-point" point={point} setPoint={setPoint} />
  )
}

const TestMovableCircle = () => {
  let [radius, setRadius] = React.useState(4)
  let [center, setCenter] = React.useState([0, 0])
  return (
    <MovableCircle
      key="test-movable-circle"
      center={center}
      radius={radius}
      setCenter={setCenter}
      setRadius={setRadius}
    />
  )
}

const TestMovableLine = () => {
  let [point1, setPoint1] = React.useState([-5, 5])
  let [point2, setPoint2] = React.useState([5, -5])
  return (
    <MovableLine
      key="test-movable-line"
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
      key="test-movable-line-ray"
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
      key="test-movable-line-segment"
      point1={point1}
      point2={point2}
      setPoint1={setPoint1}
      setPoint2={setPoint2}
      style={{ stroke: KhanColors.BLUE }}
    />
  )
}
