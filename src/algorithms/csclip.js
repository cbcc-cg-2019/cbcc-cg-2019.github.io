export default class CohenSutherland {
  constructor({ xmax, ymax, xmin, ymin }) {
    Object.assign(this, { xmax, ymax, xmin, ymin })
    this.inside = 0 //0000
    this.left = 1 //0001
    this.right = 2 //0010
    this.bottom = 4 //0100
    this.top = 8 //1000
  }

  _mkcode(x, y) {
    let code = this.inside //init as if it was inside
    if (x < this.xmin) code |= this.left
    else if (x > this.xmax) code |= this.right
    if (y < this.ymin) code |= this.bottom
    else if (y > this.ymax) code |= this.top

    return code
  }

  clip(linePts) {
    let [[x1, y1], [x2, y2]] = linePts
    let c1 = this._mkcode(x1, y1)
    let c2 = this._mkcode(x2, y2)

    while (true) {
      if (c1 === 0 && c2 === 0) {
        //trivially accepted
        return [[x1, y1].map(Math.round), [x2, y2].map(Math.round)]
      } else if (c1 & c2) {
        //trivially rejected
        return null
      } else {
        let x, y, code

        if (c1 !== 0) code = c1
        else code = c2

        if (code & this.top) {
          x = x1 + ((x2 - x1) * (this.ymax - y1)) / (y2 - y1)
          y = this.ymax
        } else if (code & this.bottom) {
          x = x1 + ((x2 - x1) * (this.ymin - y1)) / (y2 - y1)
          y = this.ymin
        } else if (code & this.right) {
          x = this.xmax
          y = y1 + ((y2 - y1) * (this.xmax - x1)) / (x2 - x1)
        } else if (code & this.left) {
          x = this.xmin
          y = y1 + ((y2 - y1) * (this.xmin - x1)) / (x2 - x1)
        }

        if (code === c1) {
          x1 = x
          y1 = y
          c1 = this._mkcode(x1, y1)
        } else {
          x2 = x
          y2 = y
          c2 = this._mkcode(x2, y2)
        }
      }
    }
  }
}
