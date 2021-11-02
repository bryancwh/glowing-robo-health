<template>
  <div>
    <ClinicStock />
    <!-- :key="refreshComp"/> -->
    <ClinicAddStock />
    <!-- @added="change()"/> -->
  </div>
</template>

<script>
import ClinicStock from "../components/ClinicStock.vue";
import ClinicAddStock from "../components/ClinicAddStock.vue";

export default {
  name: "Appointment",
  components: {
    ClinicStock,
    ClinicAddStock,
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
