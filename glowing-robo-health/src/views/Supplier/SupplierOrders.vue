<template>
  <div>
    <div class="topnav">
      <b class="app_name">Glowing Robo Health Supplier</b>
      <a href="/SupplierHome">Home</a>
      <!-- <a href="/ClinicStockpile">Clinic</a> -->
      <a href="/SupplierStockpile">Supplier</a>
      <a class="active" href="/SupplierOrders">Orders</a>
      <a href="/ViewSupplier">Inventory</a>
      <!-- <a href="/OrderFormTemp">Request</a> -->
      <a href="/auth">Logout</a>
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
