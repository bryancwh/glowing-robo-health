<template>
  <div>
    <div><h1 class="header">View Stocks</h1></div>
    <div class="table_div">
      <table id="table" :key="count">
        <tr>
          <th>Supplier</th>
          <th>Name</th>
          <th>Manufacturer</th>
          <th>Product ID</th>
          <th>Stock Availability</th>
        </tr>
        <tr v-for="medicine in stocks" :key="medicine.firstName">
          <td>Supplier 1</td>
          <td>{{ medicine.name }}</td>
          <td>{{ medicine.manufacturer }}</td>
          <td>{{ medicine.product_id }}</td>
          <td v-if="medicine.stock_level > 0">Available</td>
          <td v-else:>Out of Stock</td>
        </tr>
      </table>
    </div>
  </div>
</template>

<script>
import firebaseApp from "../firebase.js";
import { getFirestore } from "firebase/firestore";
import { collection, getDocs, setDoc, query } from "firebase/firestore";

const db = getFirestore(firebaseApp);

export default {
  mounted() {
    this.display();
  },
  data() {
    return {
      stocks: [],
    };
  },
  methods: {
    async display() {
      const path = query(collection(db, "stock/supplier/supplier_1"));
      let supplier = await getDocs(path);
      supplier.forEach((doc) => {
        this.stocks.push(doc.data());
      });
      console.log("this eMPLOYEES", this.doc);
    },
  },
};
</script>

<style>
html,
body {
  /* Height and width fallback for older browsers. */
  height: 100%;
  width: 100%;
  background-color: rgb(237, 245, 252);
}

h1,
h2 {
  text-align: left;
  padding-left: 30px;
  color: black;
  font: 700;
  display: block;
  font-size: 2em;
  font-weight: bold;
  font-family: "Times New Roman", Times, serif;
}
.header {
  width: 70%;
  height: 20%;
  color: black;
  background-color: rgb(237, 245, 252);
  position: relative;
  top: 70px;
  left: 80px;
}
.table_div {
  border-radius: 25px;
  border: 2px solid white;
  padding: 20px;
  background-color: white;
  position: relative;
  top: 70px;
  width: 85%;
  height: 500px;
  left: 80px;
  overflow: auto;
}

tr:hover {
  background-color: rgb(218, 218, 218);
}
tr {
  background-color: white;
  height: 25px;
}
tr:nth-child(even) {
  background-color: white;
}
tr:nth-child(even):hover {
  background-color: rgb(218, 218, 218);
}
th {
  background-color: rgb(223, 223, 223);
}
</style>
