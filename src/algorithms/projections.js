import {matrixMult, vectorTransposeInv, vectorTranspose} from './utils'

/**
 * Returns a 3D-homogeneous perspective point
 * @param {Number[]} m homogeneous perspective point (1xn-vector)
 * @param {Number} d perspective-plan's distance to origin
 */
export function perspective1p (m, d) {
  let out = matrixMult([
    [d, 0, 0, 0],
    [0, d, 0, 0],
    [0, 0, d, 0],
    [0, 0, 1, 0]], vectorTranspose(m))
  out = vectorTransposeInv(out)
  const z = out[3]
  return out.map(value => value / z)
}

/**
 * Returns a 3D-plain-projection point in XY plan
 * @param {Number[]} m homogeneous perspective point (1xn-vector)
 * @param {Number} tz z-axis translation
 */
export function orthographicXY (m, tz) {
  let out = matrixMult([
    [1, 0, 0, 0],
    [0, 1, 0, 0],
    [0, 0, 0, tz],
    [0, 0, 0, 1]], vectorTranspose(m))
  return vectorTransposeInv(out)
}

/**
 * Returns a 3D-plain-projection point in YZ plan
 * @param {Number[]} m homogeneous perspective point (1xn-vector)
 * @param {Number} tx x-axis translation
 */
export function orthographicYZ (m, tx) {
  let out = matrixMult([
    [0, 0, 0, tx],
    [0, 1, 0, 0],
    [0, 0, 1, 0],
    [0, 0, 0, 1]], vectorTranspose(m))
  return vectorTransposeInv(out)
}

/**
 * Returns a 3D-plain-projection point in XZ plan
 * @param {Number[]} m homogeneous perspective point (1xn-vector)
 * @param {Number} ty y-axis translation
 */
export function orthographicXZ (m, ty) {
  let out = matrixMult([
    [1, 0, 0, 0],
    [0, 0, 0, ty],
    [0, 0, 1, 0],
    [0, 0, 0, 1]], vectorTranspose(m))
  return vectorTransposeInv(out)
}
