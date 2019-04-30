<template>
  <canvas ref="canvas" id="canvas" :width="width" :height="height"></canvas>
</template>

<script>
const GRID_BG = 'white'
const GRID_LINE = '#A0A0A0'

export default {
  name: 'Canvas',

  props: {
    height: {
      type: Number,
      default: 560
    },

    width: {
      type: Number,
      default: 560
    }
  },

  data: () => ({
    PIXEL: 10
  }),

  computed: {
    ctx() {
      return this.$refs.canvas && this.$refs.canvas.getContext('2d')
    },

    size() {
      return Math.max(this.width, this.height) / this.PIXEL
    }
  },

  mounted() {
    this._drawGrid()
  },

  methods: {
    /* Private */
    _drawGrid() {
      this.ctx.fillStyle = GRID_BG
      this.ctx.fillRect(0, 0, this.width, this.height)

      this.ctx.beginPath()
      this.ctx.strokeStyle = GRID_LINE

      for (let y = 0; y < this.height; y += this.PIXEL) {
        this.ctx.moveTo(0, y)
        this.ctx.lineTo(this.width, y)
      }

      for (let x = 0; x < this.height; x += this.PIXEL) {
        this.ctx.moveTo(x, 0)
        this.ctx.lineTo(x, this.height)
      }

      this.ctx.stroke()
    },

    /* Public */
    pixel(x, y, color) {
      const realX = x * this.PIXEL
      const realY = y * this.PIXEL
      this.ctx.fillStyle = color
      this.ctx.fillRect(realX + 1, realY + 1, this.PIXEL - 1, this.PIXEL - 1)
    },

    readMemoryBuffer(memoryBuffer) {
      const buffer = memoryBuffer.toArray()
      for (let y = 0; y < buffer.length; y++) {
        for (let x = 0; x < buffer.length; x++) {
          if (buffer[y][x]) {
            const color = memoryBuffer.getColorById(buffer[y][x])
            this.pixel(x, y, color)
          }
        }
      }
    }
  }
}
</script>
