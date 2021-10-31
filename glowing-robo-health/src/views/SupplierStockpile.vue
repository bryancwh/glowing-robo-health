<template>
    <div>    
        <h1> Supplier Stockpile for supplier 1</h1>
        <SupplierStock/> 
        <!-- :key="refreshComp"/> -->
        <SupplierAddStock/>
        <!-- @added="change()"/> -->
    </div>
</template>

<script>
import SupplierStock from "../components/SupplierStock.vue";
import SupplierAddStock from "../components/SupplierAddStock.vue"

export default {
    name: "Appointment",
    components: {
        SupplierStock,
        SupplierAddStock
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
