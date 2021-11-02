<template>
  <div>
    <div>
      <h1 class="header">Supplier Stockpile for supplier 1</h1>
    </div>
    <div class="table_divider">
      <table id="table" :key="count">
        <tr>
          <th>Name</th>
          <th>Manufacturer</th>
          <th>Product ID</th>
          <th>Stock Level</th>
          <th>Stock Availability</th>
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
  </div>
</template>

<script>
import firebaseApp from "../firebase.js";
import { getFirestore } from "firebase/firestore";
import { collection, getDocs, setDoc, query } from "firebase/firestore";
// import UpdateStock from "../components/UpdateStock.vue";

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

<style></style>
