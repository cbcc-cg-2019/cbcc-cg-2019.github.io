const EMPTY = 0
const FILL = 1

export default class MemoryBuffer {
  constructor (size) {
    const length = size

    this.grid = Array.from({length}, () =>
      Array.from({length}, () => EMPTY)
    )
  }

  pixel (x, y) {
    this.grid[y][x] = FILL
  }

  clean (x, y) {
    this.grid[y][x] = EMPTY
  }

  toArray () {
    // clone
    return this.grid
      .map(row => row.concat())
  }
}
