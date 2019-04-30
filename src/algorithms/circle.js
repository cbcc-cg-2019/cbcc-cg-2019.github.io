export default class Circle {
  constructor(buffer, color) {
    this.buffer = buffer
    this.color = this.buffer.addColor(color)
  }

  draw(centerPoint, radius) {
    const [centerX, centerY] = centerPoint

    let x = radius
    let y = 0
    let p = 1 - radius

    this.buffer.pixel(centerX - x, centerY - y, this.color)

    if (radius > 0) {
      this.buffer.pixel(centerX, centerY - radius, this.color)
      this.buffer.pixel(x + centerX, -y + centerY, this.color)
      this.buffer.pixel(y + centerX, x + centerY, this.color)
      this.buffer.pixel(-y + centerX, x + centerY, this.color)
    }

    while (x > y) {
      y++

      if (p <= 0) {
        p += 2 * y + 1
      } else {
        x--
        p += 2 * y - 2 * x + 1
      }

      if (x < y) {
        break
      }

      this.buffer.pixel(x + centerX, y + centerY, this.color)
      this.buffer.pixel(-x + centerX, y + centerY, this.color)
      this.buffer.pixel(x + centerX, -y + centerY, this.color)
      this.buffer.pixel(-x + centerX, -y + centerY, this.color)

      if (x !== y) {
        this.buffer.pixel(y + centerX, x + centerY, this.color)
        this.buffer.pixel(-y + centerX, x + centerY, this.color)
        this.buffer.pixel(y + centerX, -x + centerY, this.color)
        this.buffer.pixel(-y + centerX, -x + centerY, this.color)
      }
    }
  }
}
