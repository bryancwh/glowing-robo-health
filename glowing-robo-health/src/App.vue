<template>
  <div>
      <div id="nav">
      <router-link to="/">Home</router-link> |
      <router-link to="/ClinicStockpile">Clinic</router-link> |
      <router-link to="/SupplierStockpile">Supplier</router-link> |
      <router-link to="/SupplierOrders">Orders</router-link> |
      <router-link to="/ViewSupplier">Supplier Info</router-link> |
      <router-link to="/OrderFormTemp">Order Form</router-link> 
    </div>
    <router-view/>
  </div>
</template>

<script>
console.log("in App");

export default {
  name: "App",
};
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
body {
  margin: 0px;
  background: #eee;
}
#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
</style>
