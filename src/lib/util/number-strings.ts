import { number as knumber } from "./math/index"

/**
 * Return a string of num rounded to a fixed precision decimal places,
 * with an approx symbol if num had to be rounded, and trailing 0s
 */
export function toFixedApprox(num: number, precision: number) {
  const fixedStr = num.toFixed(precision)
  if (knumber.equal(+fixedStr, num)) {
    return fixedStr
  } else {
    return `\\approx ${fixedStr}`
  }
}

/**
 * Return a string of num rounded to precision decimal places, with an
 * approx symbol if num had to be rounded, but no trailing 0s if it was
 * not rounded.
 */
export function roundToApprox(num: number, precision: number) {
  const fixed = knumber.round(num, precision)
  if (knumber.equal(fixed, num)) {
    return String(fixed)
  } else {
    return toFixedApprox(num, precision)
  }
}

// Returns the format (string) of a given numeric string
// Note: purposively more inclusive than answer-types' predicate.forms
// That is, it is not necessarily true that interpreted input are numeric
export function getNumericFormat(text: string) {
  text = text.trim()
  text = text.replace(/\u2212/, "-").replace(/([+-])\s+/g, "$1")
  if (text.match(/^[+-]?\d+$/)) {
    return "integer"
  } else if (text.match(/^[+-]?\d+\s+\d+\s*\/\s*\d+$/)) {
    return "mixed"
  }
  const fraction = text.match(/^[+-]?(\d+)\s*\/\s*(\d+)$/)
  if (fraction) {
    return parseFloat(fraction[1]) > parseFloat(fraction[2])
      ? "improper"
      : "proper"
  } else if (text.replace(/[,. ]/g, "").match(/^\d+$/)) {
    return "decimal"
  } else if (text.match(/(pi?|\u03c0|t(?:au)?|\u03c4|pau)/)) {
    return "pi"
  } else {
    return null
  }
}

// Returns a string of the number in a specified format
export function toNumericString(number: number, format: string) {
  if (number == null) {
    return ""
  } else if (number === 0) {
    return "0" // otherwise it might end up as 0% or 0pi
  }

  if (format === "percent") {
    return `${number * 100}%`
  }

  if (format === "pi") {
    const fraction = knumber.toFraction(number / Math.PI)
    const numerator = Math.abs(fraction[0])
    const denominator = fraction[1]
    if (Number.isInteger(numerator)) {
      const sign = number < 0 ? "-" : ""
      return `${sign}${numerator === 1 ? "" : numerator}π${
        denominator === 1 ? "" : `/${denominator}`
      }`
    }
  }

  if (["proper", "improper", "mixed", "fraction"].includes(format)) {
    const fraction = knumber.toFraction(number)
    const numerator = Math.abs(fraction[0])
    const denominator = fraction[1]
    const sign = number < 0 ? "-" : ""
    if (denominator === 1) {
      return sign + numerator // for integers, irrational, d > 1000
    } else if (format === "mixed") {
      const modulus = numerator % denominator
      const integer = (numerator - modulus) / denominator
      return `${sign}${integer ? integer + " " : ""}${modulus}/${denominator}`
    } // otherwise proper, improper, or fraction
    return sign + numerator + "/" + denominator
  }

  // otherwise (decimal, float, long long)
  return String(number)
}

// Simplify formulas before display
export function cleanMath(expr: string | any) {
  return typeof expr === "string"
    ? expr
        .replace(/\+\s*-/g, "- ")
        .replace(/-\s*-/g, "+ ")
        .replace(/\^1/g, "")
    : expr
}
