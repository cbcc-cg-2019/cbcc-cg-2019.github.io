<template>
  <div id="playground" class="container">
    <div class="row content-margin">
      <div class="col-md-8 canvas">
        <Canvas ref="canvas"/>
      </div>
      <div class="col-md-4">
        <div class="row">
          <Tool v-for="(tool, id) of tools" :key="id" :name="tool.name" :image="tool.image"/>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Canvas from './playground/Canvas'
import Tool from './playground/Tool'
import helloWorld from '../algorithms/hello-world'
import bresenham from '../algorithms/bresenham'
import circle from '../algorithms/circle'

export default {
  name: 'Playground',
  components: {
    Canvas,
    Tool
  },
  data: () => ({
    tools: [
      {
        name: 'Tool1',
        image: 'http://lorempixel.com/output/nightlife-q-c-200-200-5.jpg'
      },
      {
        name: 'Tool2',
        image: 'http://lorempixel.com/output/nightlife-q-c-200-200-5.jpg'
      },
      {
        name: 'Tool3',
        image: 'http://lorempixel.com/output/nightlife-q-c-200-200-5.jpg'
      },
      {
        name: 'Tool1',
        image: 'http://lorempixel.com/output/nightlife-q-c-200-200-5.jpg'
      },
      {
        name: 'Tool2',
        image: 'http://lorempixel.com/output/nightlife-q-c-200-200-5.jpg'
      },
      {
        name: 'Tool3',
        image: 'http://lorempixel.com/output/nightlife-q-c-200-200-5.jpg'
      }
    ]
  }),

  mounted () {
    const { canvas } = this.$refs

    canvas.readMemoryBuffer(
      helloWorld(canvas.size)
    )

    canvas.readMemoryBuffer(
      bresenham(canvas.size, [16, 16], [27, 27])
    )

    canvas.readMemoryBuffer(
      circle(canvas.size, [7, 21], 5)
    )
  }
}
</script>

<style scoped>
.content-margin {
  margin: 100px 0px;
}
</style>
