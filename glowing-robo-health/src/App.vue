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

<style></style>
