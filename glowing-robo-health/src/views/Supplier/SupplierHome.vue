<template>
<div>
  <div>
    <div class="topnav">
      <b class="app_name">Glowing Robo Health Supplier</b>
      <a class="active" href="/supplierhome">Home</a>
      <a href="/supplierstockview">Your Stocks</a>
      <a href="/supplierorders">Orders</a>
      <LogOut />
    </div>
  </div>
  <h1>Welcome to glowing robo health!</h1>
  <h1> Email: <strong>{{user.email}}</strong></h1>
  <h1> Name: <strong>{{user.displayName}}</strong></h1>
  <h1> UID: <strong>{{user.uid}}</strong></h1>
</div>
</template>

<script>
import LogOut from "../../components/LogOut.vue";
import { getAuth, onAuthStateChanged } from "firebase/auth";

export default {
  components: {
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
