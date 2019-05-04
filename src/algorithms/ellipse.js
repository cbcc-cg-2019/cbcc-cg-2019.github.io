export default class Ellipse {
  constructor (buffer, color, { centerPoint, a, b }) {
    Object.assign(this, { centerPoint, a, b })
    this.buffer = buffer
    this.color = buffer.addColor(color)
  }

  draw () {
    const [xCenter, yCenter] = this.centerPoint
    for (let angle = 0; angle <= 2 * Math.PI; angle += 0.01) {
      let x = Math.round(this.a * Math.cos(angle))
      let y = Math.round(this.b * Math.sin(angle))
      this.buffer.pixel(xCenter + x, yCenter + y, this.color)
    }
  }
}
