export default class MidpointClip {
  constructor ({ xmax, ymax, xmin, ymin }) {
    Object.assign(this, { xmax, ymax, xmin, ymin })
    this.inside = 0 // 0000
    this.left = 1 // 0001
    this.right = 2 // 0010
    this.bottom = 4 // 0100
    this.top = 8 // 1000
  }

  _mkcode (x, y) {
    let code = this.inside // init as if it was inside
    if (x < this.xmin) code |= this.left
    else if (x > this.xmax) code |= this.right
    if (y < this.ymin) code |= this.bottom
    else if (y > this.ymax) code |= this.top

    return code
  }

  clip (linePts) {
    let [[x1, y1], [x2, y2]] = linePts
    console.log((x1, x2), (y1, y2))
    let c1 = this._mkcode(x1, y1)
    let c2 = this._mkcode(x2, y2)
    console.log(c1, c2)

    if (c1 === 0 && c2 === 0) {
      // trivially accepted
      return [[x1, y1].map(Math.round), [x2, y2].map(Math.round)]
    } else if (c1 !== 0 && c2 !== 0 && c1 && c2) {
      // trivially rejected
      return null
    } else {
      const xm = (x1 + x2) / 2
      const ym = (y1 + y2) / 2

      this.clip([[x1, y1], [xm, ym]])
      this.clip([[xm, ym], [x2, y2]])
    }
  }
}
