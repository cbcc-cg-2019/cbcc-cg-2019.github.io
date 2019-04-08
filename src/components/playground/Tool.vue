<template>
  <div
    @click="$emit('select-tool', name)"
    class="col-md-6 col-xs-3">
    <img :src="imageUrl" width="50%">
    <div class="label">{{name}}</div>
  </div>
</template>

<script>
export default {
  name: 'Tool',

  props: {
    name: String,
    imageUrl: String,
    algorithmFileUrl: String
  }
}
</script>

<style scoped>
.label {
  text-align: left;
}
</style>
