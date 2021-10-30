<template>
  <ClinicStockpile/>
</template>

<script>
import ClinicStockpile from "./views/ClinicStockpile.vue";
console.log("in App")


export default {
  components: {
    ClinicStockpile,
  },
  name: 'App',
  
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
