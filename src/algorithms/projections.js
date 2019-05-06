import { matrixMult, vectorTransposeInv, vectorTranspose, sin, cos, } from './utils'
import { rotate3dX, rotate3dY } from './transform';

/**
 * Returns a 3D-homogeneous perspective point
 * Suffix "1p" stands for 1 perspective point
 * @param {Number[]} m 3D homogeneous point (1xn-vector)
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
  return out.map(value => value / z) //correct homogeneous coordinate
}

/**
 * Returns a 3D-homogeneous perspective point
 * Suffix "2p" stands for 2 perspective points
 * @param {Number[]} m 3D homogeneous point (1xn-vector)
 * @param {Number} d perspective-plan's distance to origin
 * @param {Number} rotationAngle 3D-rotation angle
 * @param {*} rotationAxis set rotation axis (x or y)
 */
export function perspective2p (m, d, rotationAngle, { rotationAxis }) {
  const fn = ({
    x: rotate3dX,
    y: rotate3dY
  })[rotationAxis] || rotate3dX

  return perspective1p(
    fn(m, rotationAngle), d
  )
}

/**
 * Returns a 3D-homogeneous perspective point
 * Suffix "3p" stands for 3 perspective points
 * @param {Number[]} m 3D homogeneous point (1xn-vector)
 * @param {Number} d perspective-plan's distance to origin
 * @param {Number} rotAngleX 3D-rotation X-axis angle
 * @param {Number} rotAngleX 3D-rotation X-axis angle
 */
export function perspective3p (m, d, rotAngleX, rotAngleY) {
  return perspective1p(
    rotate3dX((
      rotate3dY(m, rotAngleY)
    ), rotAngleX), d
  )
}

/**
 * Returns a 3D-plain-projection point in XY plan
 * @param {Number[]} m 3D homogeneous point (1xn-vector)
 * @param {Number} tz z-axis translation
 */
export function orthographicXY (m, tz = 0) {
  let out = matrixMult([
    [1, 0, 0, 0],
    [0, 1, 0, 0],
    [0, 0, 0, tz],
    [0, 0, 0, 1]], vectorTranspose(m))
  return vectorTransposeInv(out)
}

/**
 * Returns a 3D-plain-projection point in YZ plan
 * @param {Number[]} m 3D homogeneous point (1xn-vector)
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
 * @param {Number[]} m 3D homogeneous point (1xn-vector)
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

/**
 * Returns a 3D-axonometric-projection point
 * Defaul is set to isometric projection
 * @param {Number[]} m 3D homogeneous point (1xn-vector)
 * @param {Number} angleX angle for X-axis 3D rotation
 * @param {Number} angleY angle for Y-axis 3D rotation
 * @returns a axonometrically-projected point
 */
export function axonometric (m, angleX = 35.264, angleY = 45) {
  return orthographicXY(
    rotate3dX(
      rotate3dY(m, angleY), angleX
    )
  )
}

/**
 * Returns a 3D-obliquous-projection point
 * Defaul is set to cavalier projection
 * @param {Number[]} m 3D homogeneous point (1xn-vector)
 * @param {Number} angle projection angle
 * @returns a axonometrically-projected point
 */
export function obliquous (m, angle, cavalier = true) {
  const d = cavalier ? 1 : 0.5
  let out = matrixMult([
    [1, 0, d * sin(angle), 0],
    [0, 0, d * cos(angle), 0],
    [0, 0, 1,              0],
    [0, 0, 0,              1]], vectorTranspose(m))
  return vectorTransposeInv(out)
}
