<template>
  <div>
    <Navbar />
    <ClinicStockFull />
  </div>
</template>

<script>
import Navbar from '@/components/Navbar.vue';
import ClinicStockFull from "../../components/ClinicStockFull.vue";
import { getAuth, onAuthStateChanged } from "firebase/auth";

export default {
  name: "Appointment",
  components: {
    ClinicStockFull,
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
      } else {
        console.log("not logged in");
      }
    });
  },
};
</script>

<style></style>
