<template>
  <div class="topnav">
    <b>Glowing Robo Health</b>
    <a class="active" href="/">Home</a>
    <a href="/ClinicStockpile">Clinic</a>
    <a href="/SupplierStockpile">Supplier</a>
    <a href="/SupplierOrders">Orders</a>
    <a href="/ViewSupplier">Inventory</a>
    <a href="/OrderFormTemp">Request</a>
</div>
</template>

<script>
export default {
};
</script>

<style>
/* Add a black background color to the top navigation */
.topnav {
  background-color: skyblue;
  overflow: hidden;
}

/* Style the links inside the navigation bar */
.topnav a {
  float: left;
  color: #f2f2f2;
  text-align: right;
  padding: 14px 16px;
  text-decoration: none;
  font-size: 17px;
}

.topnav b {
  float: left;
  color: #f2f2f2;
  text-align: right;
  padding: 14px 20px;
  text-decoration: none;
  font-size: 19px;
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
}</style>