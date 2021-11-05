<template>

  <div>
    <div class="topnav">
      <b class="app_name">Glowing Robo Health Clinic</b>
      <a class="active" href="/">Home</a>
      <a href="/ClinicStockpile">Clinic</a>
      <!-- <a href="/SupplierStockpile">Supplier</a> -->
      <!-- <a href="/SupplierOrders">Orders</a> -->
      <!-- <a href="/ViewSupplier">Inventory</a> -->
      <a href="/OrderFormTemp">Request</a>
      <a href="/auth"> Logout </a>
    </div>

    <div>
      <h1>Welcome to glowing robo health!</h1>
      <h1> Email: <strong>{{user.email}}</strong></h1>
      <h1> Name: <strong>{{user.displayName}}</strong></h1>
      <h1> Uid: <strong>{{user.uid}}</strong> </h1>
    </div>
  </div>


</template>

<script>

import { getAuth, onAuthStateChanged } from "firebase/auth";

export default {
  name: 'Profile',
  data() {
    return {
        user: null,
    };
  },
  mounted() {
    const auth = getAuth();
    onAuthStateChanged(auth, (user) => {
      if (user) {
        this.user = user;      
      } else {
        console.log('not logged in')
      }
    })
  }
}


</script>

<style></style>
