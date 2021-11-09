<template>
  <div>
    <header class="app-header">
      <!-- <NavBar /> -->
    </header>
    <router-view/>    
  </div>
</template>

<script>
// import NavBar from './components/NavBar.vue'
export default {
  // components: { NavBar },
  name: "App",
};
</script>

<style>
@import url('https://fonts.googleapis.com/css2?family=Source+Sans+Pro:wght@400;600;700&display=swap');
.app-header {
  margin-top: 5px;
}
/* Add a black background color to the top navigation */
.topnav {
  background-color: skyblue;
  overflow: hidden;
}
/* Style the links inside the navigation bar */
.topnav a {
  float: left;
  color: #f2f2f2;
  text-align: right;
  padding: 14px 16px;
  text-decoration: none;
  font-size: 17px;
}
.topnav b {
  float: left;
  color: #f2f2f2;
  text-align: right;
  padding: 14px 20px;
  text-decoration: none;
  font-size: 19px;
}
/* Change the color of links on hover */
.topnav a:hover {
  background-color: #ddd;
  color: black;
}
/* Add a color to the active/current link */
.topnav a.active {
  background-color: #ddd;
  color: black;
}
.currentLink {
  background-color: #ddd;
  color: black;
}
</style>