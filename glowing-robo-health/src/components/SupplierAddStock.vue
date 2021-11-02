<template>
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
</template>

<script>
import firebaseApp from "../firebase.js";

import { getFirestore } from "firebase/firestore";
import { doc, getDocs, setDoc, query, collection } from "firebase/firestore";

const db = getFirestore(firebaseApp);
//
export default {
  data() {
    return {
      name: "",
      quantity: "",
    };
  },
  methods: {
    async updateQuantity() {
      var name = document.getElementById("name").value;
      var stock_level = document.getElementById("stock_level").value;
      var manufacturer = document.getElementById("manufacturer").value;
      var product_id = document.getElementById("product_id").value;
      const path = "supplier/supplier_1/" + this.name;
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
        // this.$emit("added")
      } catch (error) {
        console.error("Error adding document: ", error);
      }
    },
  },
};
</script>

<style scoped>
.form_divider {
  border-radius: 25px;
  border: 2px solid white;
  padding: 10px;
  background-color: white;
  position: relative;
  top: 70px;
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
  text-transform: uppercase;
  background: white;
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
