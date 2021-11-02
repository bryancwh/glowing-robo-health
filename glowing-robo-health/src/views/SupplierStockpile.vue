<template>
  <div>
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
