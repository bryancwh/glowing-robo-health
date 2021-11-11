<template>
  <div>
    <Navbar />
    <div style="padding: 40px;">
      <h1><b>Stocks below threshold</b></h1>
      <ClinicChart />
    </div>
  </div>
</template>

<script>
import Navbar from "@/components/Navbar.vue";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import ClinicChart from "@/components/ClinicChart.vue";

export default {
  name: "Profile",
  components: {
    Navbar,
    ClinicChart,
  },
  data() {
    return {
      user: {
        email: "",
        displayName: "",
        uid: "",
      },
    };
  },
  mounted() {
    const auth = getAuth();
    this.user = auth.currentUser;
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
</style>
