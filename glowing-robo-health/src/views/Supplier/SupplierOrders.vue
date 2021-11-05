<template>
  <div>
    <div class="topnav">
      <b class="app_name">Glowing Robo Health Supplier</b>
      <a href="/supplierhome">Home</a>
      <a href="/supplierstockview">Your Stocks</a>
      <a class="active" href="/supplierorders">Orders</a>
      <LogOut />
    </div>
    <SupplierOrdersTable />
  </div>
</template>

<script>
import LogOut from "../../components/LogOut.vue";
import SupplierOrdersTable from "@/components/SupplierOrdersTable.vue";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import firebaseApp from "../../firebase";

export default {
  name: "SupplierOrders",
  data() {
    return {
      user: null,
    };
  },
  components: {
    SupplierOrdersTable,
    LogOut,
  },
  mounted() {
    const auth = getAuth();

    firebase.auth().onAuthStateChanged(function(user) {
      if (user) {
        this.user = user;
        console.log("hi");
        console.log(this.user);
      } else {
        console.log("not logged in");
      }
    });
  },
};
</script>

<style></style>
