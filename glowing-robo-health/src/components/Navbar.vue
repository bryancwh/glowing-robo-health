<template>
    <div style="display: flex; justify-content: space-between; padding: 0 20px; width: 100%;">
        <img src="../assets/logov2.png" style="height: 50px; margin-right: 16px;" />
        <a-menu
            v-model="current"
            theme="light"
            mode="horizontal"
            :style="{ lineHeight: '64px', width: '100%', display: 'flex', justifyContent: 'end' }"
        >
            <a-menu-item key="home"><a href="/clinichome">Home</a></a-menu-item>
            <a-menu-item key="clinicorders"><a href="/clinicorders">Orders</a></a-menu-item>
            <a-menu-item key="clinicstockview"><a href="/clinicstockview">Stocks</a></a-menu-item>
            <a-menu-item key="clinicsupplierview"><a href="/clinicsupplierview">Suppliers</a></a-menu-item>
            <a-menu-item key="clinicorderformpage"><a href="/clinicorderformpage">Request</a></a-menu-item>
            <a-menu-item key="clinicchat"><a href="/clinicchat">Chat</a></a-menu-item>
            <a-menu-item key="5"><LogOut /></a-menu-item>
        </a-menu>
    </div>
</template>

<script>
import { defineComponent, ref } from "vue";
import LogOut from "../components/LogOut.vue";

export default defineComponent({
    setup() {
        var currUrl = window.location.pathname;
        const current = ref(['home']);

        return {
            current,
        };
    },
    components: {
        LogOut
    },
});
</script>

