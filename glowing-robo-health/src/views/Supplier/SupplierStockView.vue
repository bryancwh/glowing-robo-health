<template>
  <div>
    <SupplierNavbar />
    <SupplierStockFull />
  </div>
</template>

<script>
import SupplierNavbar from '../../components/SupplierNavbar.vue';
import SupplierStockFull from "@/components/SupplierStockFull.vue";
import { getAuth, onAuthStateChanged } from "firebase/auth";

export default {
  name: "Appointment",
  components: {
    SupplierStockFull,
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

<style></style>
