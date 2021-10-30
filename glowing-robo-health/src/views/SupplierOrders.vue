<template>
  <div>
    <h1>Supplier orders for all clinics</h1>
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
