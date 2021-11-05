<template>
  <div>
    <div class="topnav">
      <b class="app_name">Glowing Robo Health</b>
      <a href="/">Home</a>
      <a href="/ClinicStockpile">Clinic</a>
      <!-- <a href="/SupplierStockpile">Supplier</a>
      <a href="/SupplierOrders">Orders</a>
      <a href="/ViewSupplier">Inventory</a> -->
      <a class="active" href="/OrderFormTemp">Request</a>
      <a>Logout</a>
    </div>
    <OrderForm />
  </div>
</template>

<script>
import OrderForm from "../components/OrderForm.vue";

export default {
  name: "Appointment",
  components: {
    OrderForm,
  },
};
</script>

<style>
/* Add a black background color to the top navigation */
.app_name {
  margin: 7px 350px 0px 0px;
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
