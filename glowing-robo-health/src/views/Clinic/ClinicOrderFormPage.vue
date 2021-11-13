<template>
  <div style="display: flex; flex-direction: column; align-items: center;">
    <Navbar />
    <ClinicOrderForm />
  </div>
</template>

<script>
import Navbar from '@/components/Navbar.vue';
import ClinicOrderForm from "@/components/ClinicOrderForm.vue";
import { getAuth, onAuthStateChanged } from "firebase/auth";

export default {
  name: "Appointment",
  components: {
    ClinicOrderForm,
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

<style>
.currentLink {
  background-color: #ddd;
  color: black;
}
</style>
