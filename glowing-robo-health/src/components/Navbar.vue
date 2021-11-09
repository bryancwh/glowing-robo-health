<template>
    <div style="display: flex; justify-content: space-between; padding: 0 20px;">
        <img src="../assets/logov2.png" style="height: 50px; margin-right: 16px;" />
        <a-menu
            theme="light"
            mode="horizontal"
            :style="{ lineHeight: '64px', width: '100%', display: 'flex', justifyContent: 'end' }"
        >
            <a-menu-item key="home"><a href="/clinichome">Home</a></a-menu-item>
            <a-menu-item key="orders"><a href="/clinicorders">Orders</a></a-menu-item>
            <a-menu-item key="stock"><a href="/clinicstockview">Stocks</a></a-menu-item>
            <a-menu-item key="suppliers"><a href="/clinicsupplierview">Suppliers</a></a-menu-item>
            <a-menu-item key="request"><a href="/clinicorderformpage">Request</a></a-menu-item>
            <a-menu-item key="5"><LogOut /></a-menu-item>
        </a-menu>
    </div>
</template>

<script>
import LogOut from "../components/LogOut.vue";

export default {
    props: ['currTab'],
    name: "Navbar",
    components: {
        LogOut,
    },
    data() {
        return {
            current: ['home'],
        }
    }
}
</script>

