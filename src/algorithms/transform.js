import { cos, sin, vectorTranspose, vectorTransposeInv, matrixMult } from './utils'

export function translate2d ([x, y], [tx, ty]) {
  return [x + tx, y + ty]
}

export function rotate2d (m, [xPivot, yPivot], angle) {
  const xShift = m[0] - xPivot
  const yShift = m[1] - yPivot
  const out = []
  out.push(Math.round(xPivot + (xShift * cos(angle) - yShift * sin(angle))))
  out.push(Math.round(yPivot + (xShift * sin(angle) + yShift * cos(angle))))
  return out
}

export function scale2d ([x, y], [sx, sy]) {
  return [x * sx, y * sy]
}

export function translate3d ([x, y, z], [tx, ty, tz]) {
  return [x + tx, y + ty, z + tz, 1]
}

export function rotate3dX (m, angle) {
  let out = matrixMult([
    [1, 0, 0, 0],
    [0, cos(angle), -sin(angle), 0],
    [0, sin(angle), cos(angle), 0],
    [0, 0, 0, 1]], vectorTranspose(m))
  return vectorTransposeInv(out)
}

export function rotate3dY (m, angle) {
  let out = matrixMult([
    [cos(angle), 0, sin(angle), 0],
    [0, 1, 0, 0],
    [-sin(angle), 0, cos(angle), 0],
    [0, 0, 0, 1]], vectorTranspose(m))
  return vectorTransposeInv(out)
}


export function rotate3dZ (m, angle) {
  let out = matrixMult([
    [cos(angle), -sin(angle), 0, 0],
    [sin(angle), cos(angle), 0, 0],
    [0, 0, 1, 0],
    [0, 0, 0, 1]], vectorTranspose(m))
  return vectorTransposeInv(out)
}

export function scale3d ([x, y, z], [sx, sy, sz]) {
  return [x * sx, y * sy, z * sz, 1]
}
