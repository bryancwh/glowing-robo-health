<template>
  <div>
    <SupplierNavbar />
    <SupplierOrdersTable />
  </div>
</template>

<script>
import SupplierNavbar from "../../components/SupplierNavbar.vue";
import SupplierOrdersTable from "@/components/SupplierOrdersTable.vue";
import { getAuth, onAuthStateChanged } from "firebase/auth";

export default {
  name: "SupplierOrders",
  components: {
    SupplierOrdersTable,
    SupplierNavbar,
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
        // console.log(this.user);
        // console.log(this.user.email);
      } else {
        // console.log("not logged in");
      }
    });
  },
};
</script>

<style></style>
