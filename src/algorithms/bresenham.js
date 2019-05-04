import {
  reflection,
  reverseReflection,
  lineSlope
} from './utils'

export default class Line {
  constructor (buffer, color, { fromPoint, toPoint }) {
    Object.assign(this, { fromPoint, toPoint })
    this.buffer = buffer
    this.color = buffer.addColor(color)
  }

  draw () {
    const [p1, p2, swapXY] = reflection(this.fromPoint, this.toPoint)

    let [x, y] = p1
    const [x2] = p2

    let slope = lineSlope(p1, p2)
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

    for (let [x, y] of reverseReflection(pixels, swapXY)) {
      this.buffer.pixel(x, y, this.color)
    }
  }

  getLine () {
    return [this.fromPoint, this.toPoint]
  }
}
