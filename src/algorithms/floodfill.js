export default class FloodFill {
  constructor(buffer, color) {
    this.buffer = buffer
    this.color = buffer.addColor(color)
  }

  setColor(color) {
    this.color = this.buffer.addColor(color)
  }

  fill(initPoint) {
    const [x, y] = initPoint
    if (
      x < 0 ||
      x >= this.buffer.grid.length ||
      y < 0 ||
      y >= this.buffer.grid.length
    )
      return

    if (!this.buffer.isPainted(x, y)) {
      this.buffer.pixel(x, y, this.color)
      this.fill([x, y + 1])
      this.fill([x + 1, y])
      this.fill([x, y - 1])
      this.fill([x - 1, y])
    }
  }
}
