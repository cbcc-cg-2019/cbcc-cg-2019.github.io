<template>
  <div id="app">
    <Canvas ref="canvas"/>
  </div>
</template>

<script>
import Canvas from './components/Canvas'
import helloWorld from './algorithms/hello-world'

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
