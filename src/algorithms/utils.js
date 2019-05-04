/**
 * Multiplies two bi-dimensional matrices
 * a (mxn-matrix) and b (pxq-matrix)
 * @param {Number[][]} a
 * @param {Number[][]} b
 * @returns {Number[][]} A new matrix c (mxq-matrix) if n === p
 * @returns null otherwise
 */
export function matrixMult (a, b) {
  const m = a.length
  const n = a[0].length
  const p = b.length
  const q = b[0].length

  // q cannot be a 1xn-vector
  if (!q | (n !== p)) throw new Error('Cannot multiply such matrices')
  const out = new Array(m)

  for (let i = 0; i < m; i++) {
    out[i] = new Array(q)
    for (let j = 0; j < q; j++) {
      out[i][j] = 0
      for (let k = 0; k < n; k++) {
        out[i][j] += a[i][k] * b[k][j]
      }
    }
  }
  return out
}

/**
 * Transposes 1xn-vector to nx1-vector
 * Example: [1, 2, 3, ...] -> [[1], [2], [3], ...]
 * @param {Number[]} v
 * @returns new transposed vector
 */
export function vectorTranspose (v) {
  const out = []
  v.forEach(n => out.push([n]))
  return out
}

/**
 * Transposes vector nx1 to 1xn. Inverse of this.vectorTranspose
 * Example: [[1], [2], [3], ...] -> [1, 2, 3, ...]
 * @param {Number[]} v
 * @returns new transposed vector
 */
export function vectorTransposeInv (v) {
  const out = []
  v.forEach(n => {
    const [value] = n
    out.push(value)
  })
  return out
}

/**
 * Replaces in given array an old item
 * by a new one
 * @param {Array} array
 * @param {*} oldItem
 * @param {*} newItem
 * @throws an error if there is no such
 * oldItem in the given array
 */
export function arrayReplace (array, oldItem, newItem) {
  if (!array.includes(oldItem)) {
    throw new Error('there is no such oldItem in the given array')
  }
  const idx = array.indexOf(oldItem)
  array[idx] = newItem
}

export function negate (x) {
  return -x
}

export function reflection (p1, p2) {
  const slope = lineSlope(p1, p2)
  const swapXY = Math.abs(slope) > 1

  const [x1, y1] = swapXY ? p1.reverse() : p1
  const [x2, y2] = swapXY ? p2.reverse() : p2

  const swapX = x1 > x2
  const swapY = y1 > y2

  const [nextX1, nextX2] = swapX ? [x1, x2].map(negate) : [x1, x2]
  const [nextY1, nextY2] = swapY ? [y1, y2].map(negate) : [y1, y2]

  const nextP1 = [nextX1, nextY1]
  const nextP2 = [nextX2, nextY2]

  return [nextP1, nextP2, swapXY]
}

export function reverseReflection (pixels, swapXY) {
  return pixels.map(pixel => {
    const [x, y] = swapXY ? pixel.reverse() : pixel
    const nextX = Math.abs(x)
    const nextY = Math.abs(y)
    return [nextX, nextY]
  })
}

export function lineSlope ([x1, y1], [x2, y2]) {
  const dx = x2 - x1
  const dy = y2 - y1

  if (dx === 0) {
    return dy
  }

  return dy / dx
}
