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
import Utils from '../algorithms/utils'

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
    setCurrentTool(toolName) {
      this.currentTool = toolName
    }

    //onClickPixel (shape. x. y)
  },

  mounted() {
    this.canvas = this.$refs.canvas
    this.buffer = new MemoryBuffer(this.canvas.size)

    const ellipse = new Ellipse(this.buffer, '#0066ff', {
      centerPoint: [25, 35],
      a: 15,
      b: 8
    })
    this.zBuffer.push(ellipse)

    const circle = new Circle(this.buffer, '#800000', {
      centerPoint: [7, 21],
      radius: 5
    })
    this.zBuffer.push(circle)

    const circle2 = new Circle(this.buffer, '#800000', {
      centerPoint: [43, 21],
      radius: 5
    })
    this.zBuffer.push(circle2)

    const line = new Line(this.buffer, '#cdcf7f', {
      fromPoint: [45, 15],
      toPoint: [10, 41]
    })
    this.zBuffer.push(line)

    const flood = new FloodFill(this.buffer, '#cd4001', {
      initPoint: [25, 35]
    })
    this.zBuffer.push(flood)

    const clipper = new CohenSutherland({
      xmax: 41,
      ymax: 39,
      xmin: 12,
      ymin: 21
    })

    const newLine = clipper.clip(line.getLine())
    Utils.arrayReplace(this.zBuffer, line, new Line(this.buffer, '#cdcf7f', {
      fromPoint: newLine[0],
      toPoint: newLine[1]
    }))
  },

  watch: {
    zBuffer: function() {
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
