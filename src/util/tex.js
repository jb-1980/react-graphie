import KhanMath from "./math.js"
import katex from "katex"
import "katex/dist/katex.min.css"
import "katex/dist/fonts/KaTeX_Main-Regular.woff"
import "katex/dist/fonts/KaTeX_Main-Regular.woff"
import "katex/dist/fonts/KaTeX_Main-Regular.woff"

export const processMath = function(text) {
  // Attempt to clean up some of the math
  text = KhanMath.cleanMath(text)
  return katex.renderToString(String(text))
}
