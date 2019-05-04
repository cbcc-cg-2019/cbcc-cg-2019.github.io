import Utils from './utils'

export default class Projections {
  /**
   * Returns a 3d-homogeneous perspective point
   * @param {Number[][]} m homogeneous perspective point (nx1-vector)
   * @param {Number} d perspective-plan's distance to origin
   */
  perspective(m, d) {
    let out = Utils.matrixMult(
      [[d, 0, 0, 0], [0, d, 0, 0], [0, 0, d, 0], [0, 0, 1, 0]],
      m
    )
    out = Utils.vectorTransposeInv(out)
    const z = out[3]
    return out.map(value => value / z)
  }
}
