<template>
  <div>
    <div class="topnav">
      <b class="app_name">Glowing Robo Health Supplier</b>
      <a href="/supplierhome">Home</a>
      <a class="active" href="/supplierstockview">Your Stocks</a>
      <a href="/supplierorders">Orders</a>
      <a> <LogOut/> </a>
    </div>
    <SupplierStockFull />
  </div>
</template>

<script>
import SupplierStockFull from "@/components/SupplierStockFull.vue";

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
