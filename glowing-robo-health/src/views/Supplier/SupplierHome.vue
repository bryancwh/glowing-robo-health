<template>
  <div>
    <div class="topnav">
      <b class="app_name">Glowing Robo Health Supplier</b>
      <a class="active" href="/supplierhome">Home</a>
      <a href="/supplierstockview">Your Stocks</a>
      <a href="/supplierorders">Orders</a>
      <LogOut />
    </div>
  </div>
</template>

<script>
import LogOut from "../../components/LogOut.vue";

export default {
  components: {
    LogOut,
  },
};
</script>

<style></style>
