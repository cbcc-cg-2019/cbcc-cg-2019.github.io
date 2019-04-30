const EMPTY = 0

export default class MemoryBuffer {
  constructor(size) {
    const length = size

    this.grid = Array.from({ length }, () =>
      Array.from({ length }, () => EMPTY)
    )

    this.ctr = 0

    //Colors pool
    this.colors = [
      // { example:
      //   id: 1,
      //   colorText: '#00edff'
      // }
    ]
  }

  /**
   * Returns a color's id in colors pool
   * @param {string} color A hexadecimal color
   */
  addColor(color) {
    const foundColor = this.colors.find(c => c.colorText === color)
    if (foundColor) return foundColor.id
    else {
      this.colors.push({
        id: ++this.ctr,
        colorText: color
      })
      return this.ctr
    }
  }

  /**
   * Returns color hexadecimal text in colors pool by id
   * @param {number} id
   */
  getColorById(id) {
    const foundColor = this.colors.find(c => c.id === id)
    return foundColor ? foundColor.colorText : 0
  }

  pixel(x, y, colorId) {
    this.grid[y][x] = colorId
  }

  clean(x, y) {
    this.grid[y][x] = EMPTY
  }

  isPainted(x, y) {
    return this.grid[y][x] > 0
  }

  bufCopy(cpBuffer) {
    const buffer = cpBuffer.toArray()
    for (let y = 0; y < buffer.length; y++) {
      for (let x = 0; x < buffer.length; x++) {
        if (buffer[y][x]) {
          this.pixel(x, y)
        }
      }
    }
  }

  toArray() {
    // clone
    return this.grid.map(row => row.concat())
  }
}
