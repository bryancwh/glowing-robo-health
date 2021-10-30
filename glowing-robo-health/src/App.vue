<template>
  <ClinicStockpile/>
  <!-- <ClinicStock></ClinicStock> -->
</template>

<script>
import ClinicStockpile from "./views/ClinicStockpile.vue";
console.log("in App")
// import ClinicStock from "./components/ClinicStock.vue";


export default {
  components: {
    // ClinicStock
    ClinicStockpile
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
