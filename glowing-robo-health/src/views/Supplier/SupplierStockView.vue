<template>
  <div>
    <div class="topnav">
      <b class="app_name">Glowing Robo Health Supplier</b>
      <a href="/supplierhome">Home</a>
      <a class="active" href="/supplierstockview">Your Stocks</a>
      <a href="/supplierorders">Orders</a>
      <LogOut />
    </div>
    <SupplierStockFull />
  </div>
</template>

<script>
import LogOut from "../../components/LogOut.vue";
import SupplierStockFull from "@/components/SupplierStockFull.vue";
import { getAuth, onAuthStateChanged } from "firebase/auth";

export default {
  name: "Appointment",
  components: {
    SupplierStockFull,
    LogOut,
  },
  data() {
    return {
      user : {
        email: "",
        displayName: "",
        uid: ""
      }
    };
  },
  mounted() {
    const auth = getAuth();
    this.user = auth.currentUser
    onAuthStateChanged(auth, (user) => {
      if (user) {
        this.user = auth.currentUser;
        console.log(this.user);
        console.log(this.user.email);
      } else {
        console.log("not logged in");
      }
    });
  },
};
</script>

<style></style>
