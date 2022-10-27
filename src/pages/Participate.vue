<template>
  <div>
    <ul class="infinite-list" v-infinite-scroll="load" style="overflow:auto">
      <!--eslint-disable-next-line-->
      <li v-for="i in count" class="infinite-list-item">{{ i }}</li>
    </ul>
  </div>
</template>

<script>
export default {
  name: "Participate",
  data() {
    return {
      count: 0
    }
  },
  methods: {
    load() {
      this.count += 2
    }
  }
}
</script>

<style scoped>
</style>