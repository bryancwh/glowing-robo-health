<template>
  <div>
    <div class="topnav">
      <b class="app_name">Glowing Robo Health Supplier</b>
      <a href="/SupplierHome">Home</a>
      <!-- <a href="/ClinicStockpile">Clinic</a> -->
      <a class="active" href="/SupplierStockpile">Supplier</a>
      <a href="/SupplierOrders">Orders</a>
      <a href="/ViewSupplier">Inventory</a>
      <!-- <a href="/OrderFormTemp">Request</a> -->
      <a href="/auth">Logout</a>
    </div>
    <SupplierStockFull />
  </div>
</template>

<script>
import SupplierStockFull from "../components/SupplierStockFull.vue";

export default {
  name: "Appointment",
  components: {
    SupplierStockFull,
  },
  // data() {
  //     return {
  //         refreshComp: 0
  //     }
  // },
  // change(){
  //     console.log('Changed')
  //     this.refreshComp += 1
  // }
};
</script>

<style></style>
