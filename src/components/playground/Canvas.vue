<template>
  <canvas
    ref="canvas"
    id="canvas"
    :width="width"
    :height="height"
  ></canvas>
</template>

<script>
const GRID_BG = 'white'
const GRID_LINE = '#A0A0A0'
const PIXEL = 15

export default {
  name: 'Canvas',

  props: {
    height: {
      type: Number,
      default: 480
    },

    width: {
      type: Number,
      default: 480
    }
  },

  data: () => ({
  }),

  computed: {
    ctx () {
      return this.$refs.canvas && this.$refs.canvas.getContext('2d')
    },

    size () {
      return Math.max(this.width, this.height)
    }
  },

  mounted () {
    this._drawGrid()
  },

  methods: {
    /* Private */
    _drawGrid () {
      this.ctx.fillStyle = GRID_BG
      this.ctx.fillRect(0, 0, this.width, this.height)

      this.ctx.beginPath()
      this.ctx.strokeStyle = GRID_LINE

      for (let y = 0; y < this.height; y += PIXEL) {
        this.ctx.moveTo(0, y)
        this.ctx.lineTo(this.width, y)
      }

      for (let x = 0; x < this.height; x += PIXEL) {
        this.ctx.moveTo(x, 0)
        this.ctx.lineTo(x, this.height)
      }

      this.ctx.stroke()
    },

    /* Public */
    pixel (x, y) {
      const realX = x * PIXEL
      const realY = y * PIXEL

      this.ctx.fillStyle = '#606060'
      this.ctx.fillRect(realX, realY, PIXEL, PIXEL)
    },

    readMemoryBuffer (memoryBuffer) {
      const buffer = memoryBuffer.toArray()
      for (let y = 0; y < buffer.length; y++) {
        for (let x = 0; x < buffer.length; x++) {
          if (buffer[y][x]) {
            this.pixel(x, y)
          }
        }
      }
    }
  }
}
</script>
