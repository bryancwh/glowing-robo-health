<template>
<div>
  <div>
  <SupplierNavbar />
  <div id = "container">
      <div id = "left">
        <img src="@/assets/medicine.png" alt="" width="200" height="200">
      </div>
      <div id = "right">
        <h1>Welcome to Glowing Robo Health, {{this.user.displayName}}! </h1>
        <h4>One-stop platform to track and manage all your medical supplies.</h4>
        <p>
          <br>Click on "Your Stocks" to track your current medical stocks.
          <br><br>Click on "Orders" to check your customers' pending orders.
          <br><br>Click on "Log Out" to exit application.
        </p>
      </div>
    </div>
  </div>
</div>
</template>

<script>
import SupplierNavbar from '../../components/SupplierNavbar.vue';
import { getAuth, onAuthStateChanged } from "firebase/auth";

export default {
  components: {
    SupplierNavbar,
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
  border: 2px solid white;
  padding: 20px;
  background-color: white;
  position: relative;
  top: 90px;
  width: 70%;
  height: 300px;
  left: 130px;
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
