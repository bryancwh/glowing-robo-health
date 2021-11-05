<template>
  <div>
    <div class="topnav">
      <b class="app_name">Glowing Robo Health</b>
      <a href="/">Home</a>
      <a href="/ClinicStockpile">Clinic</a>
      <a href="/SupplierStockpile">Supplier</a>
      <a class="active" href="/SupplierOrders">Orders</a>
      <a href="/ViewSupplier">Inventory</a>
      <a href="/OrderFormTemp">Request</a>
      <a>Logout</a>
    </div>
    <SupplierOrders />
  </div>
</template>

<script>
import SupplierOrders from "../components/SupplierOrdersTable.vue";

export default {
  name: "SupplierOrder",
  components: {
    SupplierOrders,
  },
};
</script>

<style></style>
