<template>
  <div>
    <div class="topnav">
      <b class="app_name">Glowing Robo Health Supplier</b>
      <a href="/supplierhome">Home</a>
      <a href="/supplierstockview">Your Stocks</a>
      <a class="active" href="/supplierorders">Orders</a>
      <a> <LogOut/> </a>
    </div>
    <SupplierOrdersTable />
  </div>
</template>

<script>
import SupplierOrdersTable from "@/components/SupplierOrdersTable.vue";

export default {
  name: "SupplierOrders",
  components: {
    SupplierOrdersTable,
  },
};
</script>

<style></style>
