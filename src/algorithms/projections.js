import {matrixMult, vectorTransposeInv, vectorTranspose} from './utils'

export default class Projections {
  /**
   * Returns a 3D-homogeneous perspective point
   * @param {Number[]} m homogeneous perspective point (1xn-vector)
   * @param {Number} d perspective-plan's distance to origin
   */
  perspective (m, d) {
    let out = matrixMult(
      [[d, 0, 0, 0], [0, d, 0, 0], [0, 0, d, 0], [0, 0, 1, 0]],
      vectorTranspose(m)
    )
    out = vectorTransposeInv(out)
    const z = out[3]
    return out.map(value => value / z)
  }

  /**
   * Returns a 2D-plain-projection point
   * @param {Number[]} m homogeneous perspective point (1xn-vector)
   * @param {Number} z z-axis translation
   */
  orthographicXY (m, tz) {
    let out = matrixMult(
      [[1, 0, 0, 0], [0, 1, 0, 0], [0, 0, 0, tz], [0, 0, 0, 1]],
      vectorTranspose(m)
    )
    return vectorTransposeInv(out)
  }
}
