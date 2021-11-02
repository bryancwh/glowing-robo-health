<template>
  <div>
    <div>
      <h1 class="header">Clinic Stockpile for clinic 1</h1>
    </div>
    <div class="table_divider">
      <table id="table" :key="count">
        <tr>
          <th>Name</th>
          <th>Manufacturer</th>
          <th>Product ID</th>
          <th>Stock Level</th>
          <th>Availability</th>
          <th></th>
          <th></th>
        </tr>
        <tr v-for="medicine in stocks" :key="medicine.firstName">
          <td>{{ medicine.name }}</td>
          <td>{{ medicine.manufacturer }}</td>
          <td>{{ medicine.product_id }}</td>
          <td>{{ medicine.stock_level }}</td>
          <td v-if="medicine.stock_level > 0">Available</td>
          <td v-else:>Out of Stock</td>
          <!-- <td v-bind:style="[medicine.stock_level > 0 ? {'color': 'red'} : { 'color': 'green'}]">{{ medicine.Status }}</td> -->
          <td>
            <button @click="deleteProduct()" class="edt">Delete</button>
          </td>
          <td>
            <button class="edt">Update</button>
          </td>
        </tr>
      </table>
    </div>
    <!-- <button class="update">
        Update Stock
    </button >
        
    <button class="add">
        Add Stock
    </button> -->
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
      const path = query(collection(db, "stock/clinic/clinic_1"));
      let stock = await getDocs(path);
      stock.forEach((doc) => {
        console.log("huehudehud", doc.data());
        this.stocks.push(doc.data());
      });
      console.log("this eMPLOYEES", this.doc);
    },
    // updateProduct() {

    // }
  },
};
</script>

<style>
.table_divider {
  border-radius: 25px;
  border: 2px solid white;
  padding: 20px;
  background-color: white;
  position: relative;
  top: 70px;
  width: 65%;
  height: 500px;
  left: 10px;
  overflow: auto;
  float: left;
}
</style>
