import MemoryBuffer from './memory-buffer'

export default function bezierCurve(size, pts) {
  const buffer = new MemoryBuffer(size)
  let x = []
  let y = []

  pts.forEach(p => {
    x.push(p[0])
    y.push(p[1])
  })

  for (let t = 0; t <= 1; t += 0.001) {
    let xt = (1 - t) ** 2 * x[0] + 2 * t * (1 - t) * x[1] + t ** 2 * x[2]
    let yt = (1 - t) ** 2 * y[0] + 2 * t * (1 - t) * y[1] + t ** 2 * y[2]
    buffer.pixel(Math.round(xt), Math.round(yt))
  }
  return buffer
}
