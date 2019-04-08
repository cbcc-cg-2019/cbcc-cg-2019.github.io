<template>
  <div v-on:click="name = 'clicked'" class="col-4">
    <img :src="getImgUrl(imageUrl)" width="25%">
    <div>{{name}}</div>
  </div>
</template>

<script>
export default {
  name: "Tool",
  props: {
    name: String,
    imageUrl: String
  },
  methods: {
    getImgUrl(url) {
      return url;
    }
  }
};
</script>

<style scoped>
</style>
