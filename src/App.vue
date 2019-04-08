<template>
  <div id="app">
    <Navbar/>
    <Playground/>
    <Footer/>
  </div>
</template>

<script>
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import Playground from './components/Playground'

export default {
  name: 'App',

  components: {
    Navbar,
    Playground,
    Footer
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
  max-height: 100vh;
  overflow: hidden;
}
</style>
