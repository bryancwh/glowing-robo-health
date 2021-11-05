<template>
  <div>
    <div class="topnav">
      <b class="app_name">Glowing Robo Health Clinic</b>
      <a href="/clinichome">Home</a>
      <a href="/clinicorders">Your Orders</a>
      <a class="active" href="/clinicstockview">Your Stocks</a>
      <a href="/clinicsupplierview">View Suppliers</a>
      <a href="/clinicorderformpage">Request</a>
      <a href="/"> Logout </a>
    </div>
    <ClinicStockFull />
  </div>
</template>

<script>
import ClinicStockFull from "../../components/ClinicStockFull.vue";

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
