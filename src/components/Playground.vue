<template>
  <div id="playground" class="container">
    <div class="row content-margin">
      <div class="col-md-8 canvas">
        <Canvas/>
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
import Canvas from "./playground/Canvas";
import Tool from "./playground/Tool";

export default {
  name: "Playground",
  components: {
    Canvas,
    Tool
  },
  data: () => ({
    tools: [
      {
        name: "Tool1",
        image: "http://lorempixel.com/output/nightlife-q-c-200-200-5.jpg"
      },
      {
        name: "Tool2",
        image: "http://lorempixel.com/output/nightlife-q-c-200-200-5.jpg"
      },
      {
        name: "Tool3",
        image: "http://lorempixel.com/output/nightlife-q-c-200-200-5.jpg"
      },
      {
        name: "Tool1",
        image: "http://lorempixel.com/output/nightlife-q-c-200-200-5.jpg"
      },
      {
        name: "Tool2",
        image: "http://lorempixel.com/output/nightlife-q-c-200-200-5.jpg"
      },
      {
        name: "Tool3",
        image: "http://lorempixel.com/output/nightlife-q-c-200-200-5.jpg"
      }
    ]
  })
};
</script>

<style scoped>
.canvas {
  border: 1px solid red;
}
.content-margin {
  margin: 100px 0px;
}
</style>
