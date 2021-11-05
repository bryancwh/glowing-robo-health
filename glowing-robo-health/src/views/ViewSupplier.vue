<template>
    <div>    
        <div class="topnav">
            <b>Glowing Robo Health</b>
            <a href="/">Home</a>
            <a href="/ClinicStockpile">Clinic</a>
            <a href="/SupplierStockpile">Supplier</a>
            <a href="/SupplierOrders">Orders</a>
            <a class="active" href="/ViewSupplier">Inventory</a>
            <a href="/OrderFormTemp">Request</a>
        </div>
        <AllStock/> 
    </div>
</template>

<script>
import AllStock from "../components/AllStock.vue";

export default {
    components: {
        AllStock,
    }
}
</script>
 
<style></style>
