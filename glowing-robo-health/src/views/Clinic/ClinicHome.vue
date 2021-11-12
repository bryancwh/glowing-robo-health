<template>
  <div style="display: flex; flex-direction: column; align-items: center;">
    <Navbar />
   
    <div style="max-width:1280px; width: 100%;">
      <div style="padding: 40px;">
        <h1 v-if="this.user">Welcome, {{this.user.displayName}}!</h1>
        <h2><b>Stocks below threshold</b></h2>
        <ClinicChart />

        <h2 style="margin-top: 70px;"><b>Calendar of Events</b></h2>
        <Calendar />
      </div>
 
    </div>
  </div>
</template>

<script>

import Navbar from '@/components/Navbar.vue';
import Calendar from "@/components/Calendar.vue";

import { getAuth, onAuthStateChanged } from "firebase/auth";
import ClinicChart from "@/components/ClinicChart.vue";

export default {
  name: "Profile",
  components: {
    Navbar,
    Calendar,
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
      } else {
        console.log("not logged in");
      }
    });
  },
};
</script>

<style scoped>
</style>
