<template>
  <div>
    <div>
      <div class="topnav">
        <b class="app_name">Glowing Robo Health Clinic</b>
        <a class="active" href="/clinichome">Home</a>
        <a href="/clinicorders">Your Orders</a>
        <a href="/clinicstockview">Your Stocks</a>
        <a href="/clinicsupplierview">View Suppliers</a>
        <a href="/clinicorderformpage">Request</a>
        <LogOut />
      </div>
    </div>
    <div id = "container">
      <div id = "left">
        <img src="@/assets/medicine.png" alt="" width="200" height="200">
      </div>
      <div id = "right">
        <h1>Welcome to Glowing Robo Health, {{user.displayName}}! </h1>
        <h4>One-stop platform to track and manage all your medical supplies.</h4>
        <p>
          <br>Click on "Your Orders" to check your pending orders.
          <br><br>Click on "Your Stocks" to track your current medical stocks.
          <br><br>Click on "View Supplies" to view your suppliers' stocks for order.
          <br><br>Click on "Log Out" to exit application.
        </p>
      </div>
    </div>
  </div>
</template>

<script>
import LogOut from "../../components/LogOut.vue";
import { getAuth, onAuthStateChanged } from "firebase/auth";

export default {
  name: "Profile",
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

<style scoped>
#container {
  border-radius: 25px;
  /* border: 2px solid white; */
  padding: 20px;
  background-color: white;
  position: relative;
  justify-content: center;
  top: 90px;
  width: 70%;
  height: 300px;
  left: 190px;
  /* overflow: auto; */
  text-align: left;
  display: flex;
}
#left {
  width: 25%;
  position: relative;
  top:40px;
  left:30px;
}
#right {
  width: 70%;
}
h4 {
  padding-left:30px;
}
p {
  padding-left:30px;
}
</style>
