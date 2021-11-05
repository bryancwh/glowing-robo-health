<template>
  <div>
    <div class="topnav">
      <b class="app_name">Glowing Robo Health Supplier</b>
      <a href="/supplierhome">Home</a>
      <a href="/supplierstockview">Your Stocks</a>
      <a class="active" href="/supplierorders">Orders</a>
      <LogOut />
    </div>
    <SupplierOrdersTable />
  </div>
</template>

<script>
import LogOut from "../../components/LogOut.vue";
import SupplierOrdersTable from "@/components/SupplierOrdersTable.vue";
import { getAuth, onAuthStateChanged } from "firebase/auth";

export default {
  name: "SupplierOrders",
  components: {
    SupplierOrdersTable,
    LogOut,
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

<style>
.app_name {
  margin: 7px 500px 0px 0px;
  font-family: New Century Schoolbook, TeX Gyre Schola, serif;
  font-weight: normal;
}

.topnav {
  background-color: rgb(26, 83, 105);
  overflow: hidden;
  height: 70px;
}

/* Style the links inside the navigation bar */
.topnav a {
  float: left;
  color: #f2f2f2;
  text-align: right;
  padding: 14px 16px;
  text-decoration: none;
  font-size: 17px;
  margin: 10px 10px 0px 10px;
  font-family: Comic Sans MS, Comic Sans, cursive;
}

.topnav b {
  float: left;
  color: #f2f2f2;
  text-align: right;
  padding: 14px 20px;
  text-decoration: none;
  font-size: 29px;
}

/* Change the color of links on hover */
.topnav a:hover {
  background-color: #ddd;
  color: black;
}

/* Add a color to the active/current link */
.topnav a.active {
  background-color: #ddd;
  color: black;
}

.currentLink {
  background-color: #ddd;
  color: black;
}
</style>
