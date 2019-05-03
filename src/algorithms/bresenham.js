export default class Line {
  constructor(buffer, color, { fromPoint, toPoint }) {
    Object.assign(this, { fromPoint, toPoint })
    this.buffer = buffer
    this.color = buffer.addColor(color)
  }

  _negate(x) {
    return -x
  }

  _reflection(p1, p2) {
    const slope = this._lineSlope(p1, p2)
    const swapXY = Math.abs(slope) > 1

    const [x1, y1] = swapXY ? p1.reverse() : p1
    const [x2, y2] = swapXY ? p2.reverse() : p2

    const swapX = x1 > x2
    const swapY = y1 > y2

    const [nextX1, nextX2] = swapX ? [x1, x2].map(this._negate) : [x1, x2]
    const [nextY1, nextY2] = swapY ? [y1, y2].map(this._negate) : [y1, y2]

    const nextP1 = [nextX1, nextY1]
    const nextP2 = [nextX2, nextY2]

    return [nextP1, nextP2, swapXY]
  }

  _reverseReflection(pixels, swapXY) {
    return pixels.map(pixel => {
      const [x, y] = swapXY ? pixel.reverse() : pixel
      const nextX = Math.abs(x)
      const nextY = Math.abs(y)
      return [nextX, nextY]
    })
  }

  _lineSlope([x1, y1], [x2, y2]) {
    const dx = x2 - x1
    const dy = y2 - y1

    if (dx === 0) {
      return dy
    }

    return dy / dx
  }

  draw() {
    const [p1, p2, swapXY] = this._reflection(this.fromPoint, this.toPoint)

    let [x, y] = p1
    const [x2] = p2

    let slope = this._lineSlope(p1, p2)
    let err = slope - 0.5

    const pixels = []
    pixels.push([x, y])

    while (x < x2) {
      if (err >= 0) {
        y++
        err--
      }

      x++
      err += slope

      pixels.push([x, y])
    }

    for (let [x, y] of this._reverseReflection(pixels, swapXY)) {
      this.buffer.pixel(x, y, this.color)
    }
  }
}
