<template>
  <button @click="$emit('select-tool', name)" class="btn btn-default">
    <img class="img-thumbnail" :src="imageUrl" width="50%">
    <div class="label">{{name}}</div>
  </button>
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
