export default class Utils {
  /**
   * Multiplies two bi-dimensional matrices
   * a (mxn-matrix) and b (pxq-matrix)
   * @param {Number[][]} a
   * @param {Number[][]} b
   * @returns {Number[][]} A new matrix c (mxq-matrix) if n === p
   * @returns null otherwise
   */
  static matrixMult(a, b) {
    const m = a.length,
      n = a[0].length,
      p = b.length,
      q = b[0].length

    //q cannot be a 1xn-vector
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
  static vectorTranspose(v) {
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
  static vectorTransposeInv(v) {
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
  static arrayReplace(array, oldItem, newItem) {
    if (!array.includes(oldItem))
      throw new Error('there is no such oldItem in the given array')
    const idx = array.indexOf(oldItem)
    array[idx] = newItem
  }
}
