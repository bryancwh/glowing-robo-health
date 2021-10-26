<template> 
  <ResourceTable/>
<router-view/>

</template>

<script>
import ResourceTable from '@/components/resource_table.vue'

export default {
  name: 'App',
  components: {
    ResourceTable,
  }
}
</script>

<style scoped>

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>