export default class Utils {
  /**
   * Multiplies two bi-dimensional matrices
   * a (mxn) and b (pxq)
   * @param {Number[][]} a
   * @param {Number[][]} b
   * @returns {Number[][]} A new matrix c (mxq) if n === p
   * @returns null otherwise
   */
  static matrixMult(a, b) {
    const m = a.length,
      n = a[0].length,
      p = b.length,
      q = b[0].length
    if (n !== p) return null
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
}
