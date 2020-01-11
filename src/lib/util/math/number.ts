/*
 * Number Utils
 * A number is a js-number, e.g. 5.12
 */
export const DEFAULT_TOLERANCE: number = 1e-9
export const EPSILON: number = 2 ** -42

export const is = (x: any) => {
  return toString.call(x) === "[object Number]" && !isNaN(x)
}

export const equal = (x: number, y: number, tolerance = DEFAULT_TOLERANCE) => {
  // We check === here so that +/-Infinity comparisons work correctly
  if (x === y) {
    return true
  }
  return Math.abs(x - y) < tolerance
}

export const sign = (x: number, tolerance = DEFAULT_TOLERANCE) => {
  return equal(x, 0, tolerance) ? 0 : Math.abs(x) / x
}

// Integer in the mathematical sense, so 10.0 is still an integer even though
// in programming it is not.
export const isInteger = (num: number, tolerance = DEFAULT_TOLERANCE) => {
  return equal(Math.round(num), num, tolerance)
}

// Round a number to a certain number of decimal places
export const round = (num: number, precision: number) => {
  var factor = 10 ** precision
  return Math.round(num * factor) / factor
}
// Round num to the nearest multiple of increment
// i.e. roundTo(83, 5) -> 85
export const roundTo = (num: number, increment: number) => {
  return Math.round(num / increment) * increment
}

// Floors num to the nearest multiple of increment
// i.e. floorTo(83, 5) -> 80
export const floorTo = (num: number, increment: number) => {
  return Math.floor(num / increment) * increment
}

// Ceils num to the nearest multiple of increment
// i.e. ceilTo(81, 5) -> 85
export const ceilTo = (num: number, increment: number) => {
  return Math.ceil(num / increment) * increment
}
/**
 * toFraction
 *
 * Returns a [numerator, denominator] array rational representation
 * of `decimal`
 *
 * See http://en.wikipedia.org/wiki/Continued_fraction for implementation
 * details
 *
 * toFraction(4/8) => [1, 2]
 * toFraction(0.66) => [33, 50]
 * toFraction(0.66, 0.01) => [2/3]
 * toFraction(283 + 1/3) => [850, 3]
 */
export const toFraction = function(
  decimal: number,
  tolerance = EPSILON,
  max_denominator = 1000
) {
  // Initialize everything to compute successive terms of
  // continued-fraction approximations via recurrence relation
  let n = [1, 0]
  let d = [0, 1]
  let a = Math.floor(decimal)
  let rem = decimal - a

  while (d[0] <= max_denominator) {
    if (equal(n[0] / d[0], decimal, tolerance)) {
      return [n[0], d[0]]
    }
    n = [a * n[0] + n[1], n[0]]
    d = [a * d[0] + d[1], d[0]]
    a = Math.floor(1 / rem)
    rem = 1 / rem - a
  }

  // We failed to find a nice rational representation,
  // so return an irrational "fraction"
  return [decimal, 1]
}

// Bound a number by 1e-6 and 1e20 to avoid exponents after toString
export const bound = (num: number) => {
  if (num === 0) {
    return num
  } else if (num < 0) {
    return -bound(-num)
  } else {
    return Math.max(1e-6, Math.min(num, 1e20))
  }
}

// calculate the factorial of a positive integer
export const factorial = (x: number) => {
  if (x < 0 || !Number.isInteger(x)) {
    throw TypeError("x must be a positive integer")
  }

  if (x <= 1) return 1

  let product = x

  while (x > 1) {
    x -= 1
    product *= x
  }
  return product
}

const PRIMES = [
  2,
  3,
  5,
  7,
  11,
  13,
  17,
  19,
  23,
  29,
  31,
  37,
  41,
  43,
  47,
  53,
  59,
  61,
  67,
  71,
  73,
  79,
  83,
  89,
  97,
]

export const isPrime = (n: number): boolean => {
  if (n <= 1) {
    return false
  } else if (n < 101) {
    return PRIMES.includes(n)
  } else if (n % 2 === 0) {
    return false
  } else if (n % 3 === 0) {
    return false
  } else {
    // sieve of eratosthenes
    let upperLimit = Math.floor(Math.sqrt(n))
    for (let i = 5; i <= upperLimit; i += 6) {
      if (n % i === 0 || n % (i + 2) === 0) return false
    }
  }

  return true
}

export function getPrimeFactorization(number: number) {
  if (number === 1) {
    return []
  } else if (isPrime(number)) {
    return [number]
  }

  const maxf = Math.sqrt(number)
  for (let f = 2; f <= maxf; f++) {
    if (number % f === 0) {
      return [...getPrimeFactorization(f), ...getPrimeFactorization(number / f)]
    }
  }
}
