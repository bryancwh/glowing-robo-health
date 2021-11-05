<template>
  <div>
    <div class="topnav">
      <b class="app_name">Glowing Robo Health Supplier</b>
      <a href="/clinichome">Home</a>
      <a class="active" href="/clinicorders">Your Orders</a>
      <a href="/clinicstockview">Your Stocks</a>
      <a href="/clinicsupplierview">View Suppliers</a>
      <a href="/clinicorderformpage">Request</a>
      <a href="/"> Logout </a>
    </div>
    <ClinicOrdersTable />
  </div>
</template>

<script>
import ClinicOrdersTable from "@/components/ClinicOrdersTable.vue";

export default {
  name: "ClinicOrders",
  components: {
    ClinicOrdersTable,
  },
};
</script>

<style></style>
