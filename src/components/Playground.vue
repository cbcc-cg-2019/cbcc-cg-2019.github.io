<template>
  <div class="container margins" id="playground">
    <div class="row">
      <div class="col-md-8 col-xs-8">
        <Canvas ref="canvas"/>
      </div>
      <div class="col-md-4 col-xs-8">
        <Tool
          v-for="(tool, id) of tools"
          @select-tool="currentTool = $event"
          :key="id"
          :name="tool.name"
          :imageUrl="tool.imageUrl"
        />
      </div>
    </div>
  </div>
</template>

<script>
import Canvas from './playground/Canvas'
import Tool from './playground/Tool'
import Circle from '../algorithms/circle'
import Ellipse from '../algorithms/ellipse'
import Line from '../algorithms/bresenham'
import CohenSutherland from '../algorithms/csclip'
import MemoryBuffer from '../algorithms/memory-buffer'
import FloodFill from '../algorithms/floodfill'
import { arrayReplace, randomHexColor } from '../algorithms/utils'
import { translate2d, rotate2d, scale2d } from '../algorithms/transform'
import { orthographicXY } from '../algorithms/projections'
import ScanLineFill from '../algorithms/scan-line-fill'
import MidpointClip from '../algorithms/mpclip'

export default {
  name: 'Playground',
  components: {
    Canvas,
    Tool
  },
  data: () => ({
    tools: [
      {
        name: 'Line',
        imageUrl: 'http://lorempixel.com/output/abstract-q-c-16-16-5.jpg'
      },
      {
        name: 'Circle',
        imageUrl: 'http://lorempixel.com/output/abstract-q-c-16-16-5.jpg'
      }
    ],
    currentTool: '',
    zBuffer: []
  }),

  methods: {
    setCurrentTool (toolName) {
      this.currentTool = toolName
    }

    // onClickPixel (shape. x. y)
  },

  mounted () {
    this.canvas = this.$refs.canvas
    this.buffer = new MemoryBuffer(this.canvas.size)

    const plane3d = [
      [[0, 0, 0, 1], [10, 0, 0, 1]],
      [[0, 0, 0, 1], [0, 10, 0, 1]],
      [[10, 0, 0, 1], [10, 10, 0, 1]],
      [[0, 10, 0, 1], [10, 10, 0, 1]]
    ]
    plane3d.map(line => {
      return line.map(point => {
        const pt = orthographicXY(point).slice(0, 2)
        console.log(pt)
        const projLine = new Line(this.buffer, '#e4e4e4', {
          fromPoint: pt[0],
          toPoint: pt[1]
        })
        this.zBuffer.push(projLine)
      })
    })
  },

  watch: {
    zBuffer: function () {
      this.zBuffer.forEach(shape => shape.draw())
      this.canvas.readMemoryBuffer(this.buffer)
    }
  }
}
</script>

<style scoped>
.margins {
  margin-top: 50px;
}

.bordered {
  border: 1px solid red;
}
</style>
