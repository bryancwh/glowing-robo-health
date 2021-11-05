<template>
<div>
  <div>
    <div class="topnav">
      <b class="app_name">Glowing Robo Health Clinic</b>
      <a class="active" href="/clinichome">Home</a>
      <a href="/clinicstockview">Your Stocks</a>
      <a href="/clinicsupplierview">View Suppliers</a>
      <a href="/clinicorderformpage">Request</a>
      <a> <LogOut/> </a>
    </div>
    
  </div>

  <!-- <h1>Welcome to glowing robo health!</h1>
  <h1> Email: <strong>{{user.email}}</strong></h1>
  <h1> Name: <strong>{{user.displayName}}</strong></h1>
  <h1> Uid: <strong>{{user.uid}}</strong></h1> -->
</div>


</template>

<script>
import LogOut from "../../components/LogOut.vue";
import { getAuth, onAuthStateChanged } from "firebase/auth";

export default {
  name: 'Profile',
  data() {
    return {
        user: null,
    };
  },
  components: {
    LogOut,
  },
  mounted() {
    const auth = getAuth();
    onAuthStateChanged(auth, (user) => {
      if (user) {
        this.user = user;
        console.log(this.user); 
      } else {
        console.log('not logged in')
      }
    })
  }
}


</script>

<style>

</style>
