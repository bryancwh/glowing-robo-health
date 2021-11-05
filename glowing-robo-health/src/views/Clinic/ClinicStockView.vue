<template>
  <div>
    <div class="topnav">
      <b class="app_name">Glowing Robo Health Clinic</b>
      <a href="/clinichome">Home</a>
      <a href="/clinicorders">Your Orders</a>
      <a class="active" href="/clinicstockview">Your Stocks</a>
      <a href="/clinicsupplierview">View Suppliers</a>
      <a href="/clinicorderformpage">Request</a>
      <LogOut />
    </div>
    <ClinicStockFull />
  </div>
</template>

<script>
import LogOut from "../../components/LogOut.vue";
import ClinicStockFull from "../../components/ClinicStockFull.vue";
import { getAuth, onAuthStateChanged } from "firebase/auth";

export default {
  name: "Appointment",
  components: {
    ClinicStockFull,
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
