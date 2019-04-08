<template>
  <div class="col-md-6 col-xs-3">
    <img :src="imageUrl" width="10%">
    <div>{{name}}</div>
  </div>
</template>

<script>
export default {
  name: 'Tool',

  props: {
    name: String,
    imageUrl: String
  }
}
</script>

<style scoped>
</style>
