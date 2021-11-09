<template>
  <div>
    <Navbar />
    <div id = "container">
      <div id = "left">
        <img src="@/assets/medicine.png" alt="" width="200" height="200">
      </div>
      <div id = "right">
        <h1>Welcome, {{user.displayName}}! </h1>
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
import Navbar from '@/components/Navbar.vue';
import { getAuth, onAuthStateChanged } from "firebase/auth";

export default {
  name: "Profile",
  components: {
    Navbar,
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
  padding: 20px;
  background-color: white;
  position: relative;
  justify-content: center;
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
</style>
