export default class FloodFill {
  constructor (buffer, color, { initPoint }) {
    Object.assign(this, { initPoint })
    this.buffer = buffer
    this.color = buffer.addColor(color)
  }

  setColor (color) {
    this.color = this.buffer.addColor(color)
  }

  _fill ([x, y]) {
    if (
      x < 0 ||
      x >= this.buffer.grid.length ||
      y < 0 ||
      y >= this.buffer.grid.length
    ) return

    if (!this.buffer.isPainted(x, y)) {
      this.buffer.pixel(x, y, this.color)
      this._fill([x, y + 1])
      this._fill([x + 1, y])
      this._fill([x, y - 1])
      this._fill([x - 1, y])
    }
  }

  draw () {
    this._fill(this.initPoint)
  }
}
