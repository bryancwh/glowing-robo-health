<template>
  <div>
    <div class="topnav">
      <b class="app_name">Glowing Robo Health</b>
      <a href="/">Home</a>
      <a class="active" href="/ClinicStockpile">Clinic</a>
      <!-- <a href="/SupplierStockpile">Supplier</a>
      <a href="/SupplierOrders">Orders</a>
      <a href="/ViewSupplier">Inventory</a> -->
      <a href="/OrderFormTemp">Request</a>
      <a>Logout</a>
    </div>
    <ClinicStockFull />
  </div>
</template>

<script>
import ClinicStockFull from "../components/ClinicStockFull.vue";
// import ClinicAddStock from "../components/ClinicAddStock.vue"

export default {
  name: "Appointment",
  components: {
    ClinicStockFull,
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
