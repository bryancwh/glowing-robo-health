<template>
  <div>
    <header class="app-header">
      <NavBar />
    </header>
    <router-view/>    
  </div>
</template>

<script>
import NavBar from './components/NavBar.vue'
console.log("in App");

export default {
  components: { NavBar },
  name: "App",
};
</script>

<style>
.app-header {
  margin-top: 5px;
}
</style>
