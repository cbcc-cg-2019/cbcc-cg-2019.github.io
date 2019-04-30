<template>
  <div @click="$emit('select-tool', name)" class="bordered">
    <img class="img-thumbnail" :src="imageUrl" width="25%">
    <div class="label">{{name}}</div>
  </div>
</template>

<script>
export default {
  name: "Tool",

  props: {
    name: String,
    imageUrl: String,
    algorithmFileUrl: String
  }
};
</script>

<style scoped>
.label {
  text-align: left;
}

.bordered {
  border: 2px solid red;
}
</style>
