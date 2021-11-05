<template>
  <div>
    <div class="topnav">
      <b class="app_name">Glowing Robo Health Supplier</b>
      <a href="/clinichome">Home</a>
      <a href="/clinicstockview">Your Stocks</a>
      <a class="active" href="/clinicsupplierview">View Suppliers</a>
      <a href="/clinicorderformpage">Request</a>
      <a> <LogOut/> </a>

    </div>
    <AllSupplierStock />
  </div>
</template>

<script>
import AllSupplierStock from "../../components/AllSupplierStock.vue";

export default {
  components: {
    AllSupplierStock,
  },
};
</script>

<style></style>
