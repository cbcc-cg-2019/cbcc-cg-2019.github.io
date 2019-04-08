import MemoryBuffer from './memory-buffer'

export default function circle (size, centerPoint, radius) {
  const buffer = new MemoryBuffer(size)

  const [centerX, centerY] = centerPoint

  let x = radius
  let y = 0
  let p = 1 - radius

  buffer.pixel(centerX - x, centerY - y)

  if (radius > 0) {
    buffer.pixel(centerX, centerY - radius)
    buffer.pixel(x + centerX, -y + centerY)
    buffer.pixel(y + centerX, x + centerY)
    buffer.pixel(-y + centerX, x + centerY)
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

    buffer.pixel(x + centerX, y + centerY)
    buffer.pixel(-x + centerX, y + centerY)
    buffer.pixel(x + centerX, -y + centerY)
    buffer.pixel(-x + centerX, -y + centerY)

    if (x !== y) {
      buffer.pixel(y + centerX, x + centerY)
      buffer.pixel(-y + centerX, x + centerY)
      buffer.pixel(y + centerX, -x + centerY)
      buffer.pixel(-y + centerX, -x + centerY)
    }
  }

  return buffer
}
