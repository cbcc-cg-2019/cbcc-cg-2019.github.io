<template>
  <div class="container" id="playground">
    <div class="row justify-content-center no-gutters">
      <div class="col-md-9">
        <div class="row no-gutters">
          <Canvas ref="canvas"/>
        </div>
      </div>
      <!-- <div class="col-md-3 bordered">
        <div class="row no-gutters">
          <Tool
            v-for="(tool, id) of tools"
            @select-tool="currentTool = $event"
            :key="id"
            :name="tool.name"
            :imageUrl="tool.imageUrl"
          />
        </div>
      </div>-->
    </div>
    {{currentTool}}
  </div>
</template>

<script>
import Canvas from './playground/Canvas'
import Tool from './playground/Tool'
import bresenham from '../algorithms/bresenham'
import Circle from '../algorithms/circle'
import Ellipse from '../algorithms/ellipse'
import bezier from '../algorithms/bezier'
import MemoryBuffer from '../algorithms/memory-buffer'
import FloodFill from '../algorithms/floodfill'

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
        imageUrl: 'http://lorempixel.com/output/nightlife-q-c-200-200-5.jpg',
        algorithmFileUrl: ''
      },
      {
        name: 'Circle',
        imageUrl: 'http://lorempixel.com/output/nightlife-q-c-200-200-5.jpg',
        algorithmFileUrl: ''
      },
      {
        name: 'Line',
        imageUrl: 'http://lorempixel.com/output/nightlife-q-c-200-200-5.jpg',
        algorithmFileUrl: ''
      },
      {
        name: 'Circle',
        imageUrl: 'http://lorempixel.com/output/nightlife-q-c-200-200-5.jpg',
        algorithmFileUrl: ''
      }
    ],
    currentTool: ''
  }),

  methods: {
    setCurrentTool(toolName) {
      this.currentTool = toolName
    }
  },

  mounted() {
    const { canvas } = this.$refs
    const buffer = new MemoryBuffer(canvas.size)

    const ellipse = new Ellipse(buffer, '#0066ff')
    ellipse.draw([25, 35], 15, 8)

    const circle = new Circle(buffer, '#800000')
    circle.draw([7, 21], 5)

    const flood = new FloodFill(buffer, '#cd4001')
    flood.fill([25, 35])

    flood.setColor('#edf545')
    flood.fill([25, 25])

    canvas.readMemoryBuffer(buffer)
  }
}
</script>

<style scoped>
.bordered {
  border: 2px solid red;
}
</style>
