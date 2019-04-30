export default class Ellipse {
  constructor(buffer, color) {
    this.buffer = buffer
    this.color = buffer.addColor(color)
  }

  draw(centerPoint, a, b) {
    const [xCenter, yCenter] = centerPoint
    for (let angle = 0; angle <= 2 * Math.PI; angle += 0.01) {
      let x = Math.round(a * Math.cos(angle))
      let y = Math.round(b * Math.sin(angle))
      this.buffer.pixel(xCenter + x, yCenter + y, this.color)
    }
  }
}
