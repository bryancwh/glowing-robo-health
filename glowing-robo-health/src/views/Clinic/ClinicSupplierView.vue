<template>
  <div>
    <Navbar />
    <AllSupplierStock />
  </div>
</template>

<script>
import Navbar from '@/components/Navbar.vue';
import AllSupplierStock from "../../components/AllSupplierStock.vue";
import { getAuth, onAuthStateChanged } from "firebase/auth";

export default {
  components: {
    AllSupplierStock,
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

<style></style>
