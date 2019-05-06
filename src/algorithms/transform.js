export function translate2d ([x, y], [tx, ty]) {
  return [x + tx, y + ty]
}

export function rotate2d (m, [xPivot, yPivot], angle) {
  const cos = x => Math.cos(x * Math.PI / 180)
  const sin = x => Math.sin(x * Math.PI / 180)
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
