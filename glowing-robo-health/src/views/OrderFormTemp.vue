<template>
    <div>    
       <div class="topnav">
            <b>Glowing Robo Health</b>
            <a href="/">Home</a>
            <a href="/ClinicStockpile">Clinic</a>
            <a href="/SupplierStockpile">Supplier</a>
            <a href="/SupplierOrders">Orders</a>
            <a href="/ViewSupplier">Inventory</a>
            <a class="active" href="/OrderFormTemp">Request</a>
        </div>
        <OrderForm/>
    </div>
</template>

<script>
import OrderForm from "../components/OrderForm.vue";

export default {
    name: "Appointment",
    components: {
        OrderForm,
    },
}
</script>
 
<style></style>
