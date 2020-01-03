import * as React from "react"
import * as ReactDOM from "react-dom"

import { GraphieProvider } from "./graphie-context"
import { MovableCircle } from "./movables"
import KhanColors from "./util/colors"
import {
  Arc,
  Asymptotes,
  Circle,
  Ellipse,
  EndpointCircles,
  Line,
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
  const [components, setComponents] = React.useState([])
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

  const availableComponents = {
    arc: <TestArc />,
    asymptotes: <TestAsymptotes />,
    circle: <TestCircle />,
    ellipse: <TestEllipse />,
    endpointCircles: <TestEndpointCircles />,
    line: <TestLine />,
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
  return (
    <div
      style={{
        padding: 30,
        position: "relative",
        border: "thin solid purple",
        display: "flex",
      }}
    >
      <GraphieProvider options={options}>
        {components.map(c => availableComponents[c])}
      </GraphieProvider>
      <form>
        {Object.keys(availableComponents).map(name => (
          <div key={name}>
            <label>
              <input
                type="checkbox"
                checked={components.includes(name)}
                onChange={() =>
                  components.includes(name)
                    ? setComponents(components.filter(c => c !== name))
                    : setComponents([...components, name])
                }
              />{" "}
              {name}
            </label>
          </div>
        ))}
      </form>
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

const TestAsymptotes = () => <Asymptotes fn={x => (1 + 5 * x) / (x - 1)} />

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

const TestLine = () => (
  <Line
    start={[-8, 8]}
    end={[8, -8]}
    style={{ stroke: KhanColors.BLUE, strokeWidth: 3 }}
  />
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
