<template>
    <div>    
        <h1> Clinic Stockpile for clinic 1</h1>
        <ClinicStockFull/> 
    </div>
</template>

<script>
import ClinicStockFull from "../components/ClinicStockFull.vue";
// import ClinicAddStock from "../components/ClinicAddStock.vue"

export default {
    name: "Appointment",
    components: {
        ClinicStockFull
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
}
</script>
 
<style></style>
