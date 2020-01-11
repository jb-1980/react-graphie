import { cleanMath } from "./number-strings"
import katex from "katex"
import "katex/dist/katex.min.css"
import "katex/dist/fonts/KaTeX_Main-Regular.woff"
import "katex/dist/fonts/KaTeX_Main-Regular.woff"
import "katex/dist/fonts/KaTeX_Main-Regular.woff"

export const processMath = function(text: string) {
  // Attempt to clean up some of the math
  text = cleanMath(text)
  return katex.renderToString(String(text))
}
