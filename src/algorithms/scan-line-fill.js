import {
  getBounds
} from './utils'

export default class ScanLineFill {
  constructor (buffer, polygonBuffer, color) {
    this.buffer = buffer
    this.polygonBuffer = polygonBuffer
    this.bounds = getBounds(polygonBuffer.grid)
    this.color = buffer.addColor(color)
  }

  setColor (color) {
    this.color = this.buffer.addColor(color)
  }

  _fill () {
    const { bounds } = this

    let intersections = []

    for (let y = bounds.yMin; y <= bounds.yMax; y++) {
      let points = []

      for (let x = bounds.xMin; x <= bounds.xMax; x++) {
        const element = this.polygonBuffer.grid[y][x]
        if (element) {
          points.push([x, y])
        }
      }

      intersections.push(points)

      // const intersectionPoints = groupEachTwo(points)
      // console.log(points, intersectionPoints)

      // for (let [p1, p2] of intersectionPoints) {
      //   console.log({p1, p2})
      // }
      // for (let i = 0; i < intersectionPoints.length; i += 2) {
      //   const [p1, p2] = intersectionPoints[i]
      //   const [startX, y] = p1
      //   const [endX] = p2

      //   // console.log(intersectionPoints[i])
      //   for (let x = startX + 1; x < endX; x++) {
      //     this.buffer.pixel(x, y, this.color)

      //   }
      // }

      if (points.length > 1) {
        console.log(points)
        const [leftmostX, y] = points[0]
        const [rightmostX] = points[points.length - 1]

        let xs = points.map(([x]) => x)
          // .filter((x, i, xs) => {
          //   const next = xs[i + 1]

          //   if (!next) {
          //     return true
          //   }

          //   return next - x !== 1
          // })
        const intersectionsWithoutNeighboors = xs
          .filter((x, i, xs) => {
            const nextX = xs[i + i]
            return true

            // if (!nextX) {
            //   return true
            // }

            // return Math.abs(x - nextX) !== 1
          })

        for (
          let x = leftmostX;
          x < rightmostX;
          x++
        ) {
          console.log('xs', xs)
          const intersectionsBefore = xs
            .filter(otherX => otherX < x)
          const isInside = intersectionsBefore.length % 2 !== 0
          const alreadyPrinted = this.polygonBuffer.grid[y][x]
          console.log({x, y, intersectionsBefore})

          if (isInside && !alreadyPrinted) {
            this.buffer.pixel(x, y, this.color)
          }
        }
      }

      // console.log(intersectionPoints)
      points = []
    }

    console.log(intersections)
  }

  draw () {
    this._fill(this.initPoint)
  }
}
