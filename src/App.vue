<template>
  <div id="app">
    <Canvas ref="canvas"/>
  </div>
</template>

<script>
import Canvas from './components/playground/Canvas'
import helloWorld from './algorithms/hello-world'
import bresenham from './algorithms/bresenham'

export default {
  name: 'App',

  components: {
    Canvas
  },

  mounted () {
    const { canvas } = this.$refs

    canvas.readMemoryBuffer(
      helloWorld(canvas.size)
    )

    canvas.readMemoryBuffer(
      bresenham(canvas.size, [16, 16], [27, 27])
    )
  }
}
</script>

<style>
body {
  background-color: #dedede;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100vw;
  height: 100vh;
  overflow: hidden;
}
</style>
