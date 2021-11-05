<template>
  <div>
    <div>
      <h1 class="header">Clinic Stockpile</h1>
    </div>
    <div class="table_divider">
      <table id="table" class="auto-index" :key="count">
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
            <button @click="deleteProduct(medicine.name)" class="edt">
              Delete
            </button>
          </td>
          <td>
            <button class="edt">Update</button>
          </td>
        </tr>
      </table>
    </div>
    <!-- <form v-on:submit.prevent> -->
    <div class="form_divider">
      <form>
        <h1>Add Stocks</h1>

        <label>Medicine Name:</label>
        <input type="text" id="name" required v-model="name" />

        <label>Manufacturer:</label>
        <input type="text" id="manufacturer" required v-model="manufacturer" />

        <label>Product ID:</label>
        <input type="text" id="product_id" required v-model="product_id" />

        <label>Quantity:</label>
        <input type="number" id="stock_level" required v-model="stock_level" />

        <div class="buttonHolder">
          <button type="button" v-on:click="updateQuantity()" class="btn">
            Add Stock
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import firebaseApp from "../firebase.js";
import { getFirestore } from "firebase/firestore";
import {
  doc,
  collection,
  deleteDoc,
  getDocs,
  setDoc,
  query,
} from "firebase/firestore";

const db = getFirestore(firebaseApp);

export default {
  mounted() {
    this.display();
  },
  data() {
    return {
      name: "",
      stock_level: "",
      manufacturer: "",
      product_id: "",
      stocks: [],
    };
  },
  methods: {
    async updateQuantity() {
      var name = document.getElementById("name").value;
      var stock_level = document.getElementById("stock_level").value;
      var manufacturer = document.getElementById("manufacturer").value;
      var product_id = document.getElementById("product_id").value;
      const path = "clinic/clinic_1/" + this.name;
      console.log(db);
      console.log(path);
      try {
        const docRef = await setDoc(doc(db, "stock", path), {
          stock_level: stock_level,
          manufacturer: manufacturer,
          name: name,
          product_id: product_id,
        });
        console.log("Updated document for: " + String(name));
        this.display();
        alert("Successfully added stock: " + this.name);
        this.name = this.stock_level = this.manufacturer = this.product_id = "";
      } catch (error) {
        console.error("Error adding document: ", error);
      }
    },

    async deleteProduct(medicine_name) {
      alert("You are going to delete " + medicine_name);
      const path = "clinic/clinic_1/" + medicine_name;
      try {
        await deleteDoc(doc(db, "stock", path));
        this.display();
        console.log("Deleted document: " + medicine_name);
      } catch (error) {
        console.error("Error deleting document: ", error);
      }
    },

    async display() {
      const path = query(collection(db, "stock/clinic/clinic_1"));
      let stock = await getDocs(path);
      this.stocks = [];
      stock.forEach((doc) => {
        this.stocks.push(doc.data());
      });
    },
    // updateProduct() {

    // }
  },
};
</script>

<style scoped>
.table_divider {
  border-radius: 25px;
  border: 2px solid white;
  padding: 20px;
  background-color: white;
  position: relative;
  top: 20px;
  width: 65%;
  height: 500px;
  left: 10px;
  overflow: auto;
  float: left;
}
.header {
  width: 70%;
  height: 20%;
  color: black;
  background-color: None;
  position: relative;
  top: 20px;
  left: 80px;
  text-align: left;
}

.form_divider {
  border-radius: 25px;
  border: 2px solid white;
  padding: 10px;
  background-color: white;
  position: relative;
  top: 20px;
  width: 25%;
  height: 517px;
  left: 10px;
  overflow: auto;
  float: left;
  margin: 0px 0px 0px 20px;
}
form {
  max-width: 570px;
  margin: 10px auto;
  background: white;
  text-align: left;
  padding: 23px;
  border-radius: 15px;
}
h1 {
  font-size: 2em;
  /* text-transform: uppercase; */
  /* background: white; */
  color: black;
  text-align: center;
}
label {
  color: rgb(0, 0, 0);
  display: inline-block;
  margin: 10px 0 10px;
  font-size: 0.8em;
  text-transform: uppercase;
  letter-spacing: 1px;
  font-weight: bold;
}
input {
  display: block;
  padding: 10px 6px;
  width: 100%;
  box-sizing: ;
  border: none;
  border-left: 1px solid #ddd;
  border-right: 1px solid #ddd;
  border-top: 1px solid #ddd;
  border-bottom: 2px solid #ddd;
  color: #555;
  border-radius: 8px;
}
.buttonHolder {
  padding: 20px;
  text-align: center;
}
.btn {
  color: black;
  background-color: #f1f1f1;
  width: 90px;
}
.btn:hover {
  background-color: black;
  color: white;
}
</style>
