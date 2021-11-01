<template>
  <!-- <form v-on:submit.prevent> -->
  <form>
    <h1>Create Order</h1>

    <label>Clinic:</label>
    <input type="text" id="clinic" required v-model="clinic" />

    <label>Supplier:</label>
    <input type="text" id="supplier" required v-model="supplier" />

    <label>Manufacturer:</label>
    <input type="text" id="manufacturer" required v-model="manufacturer" />

    <label>Product Name:</label>
    <input type="text" id="name" required v-model="name" />

    <label>Quantity:</label>
    <input type="number" id="stock_level" required v-model="stock_level" />

    <div class="buttonHolder">
      <button type="button" v-on:click="submitOrder()">Submit Order</button>
    </div>
  </form>
</template>

<script>
import firebaseApp from "../firebase.js";
import { getFirestore } from "firebase/firestore";
import { doc, getDocs, setDoc, query, collection } from "firebase/firestore";

const db = getFirestore(firebaseApp);
export default {
  data() {
    return {
      name: "",
      quantity: "",
    };
  },
  methods: {
    async submitOrder() {
      var clinic = document.getElementById("clinic").value;
      var supplier = document.getElementById("supplier").value;
      var manufacturer = document.getElementById("manufacturer").value;
      var name = document.getElementById("name").value;
      var quantity_ordered = document.getElementById("stock_level").value;
      var product_id = 1;
      var status = "pending";
      var purchase_date = new Date();
      //   const path = this.name;
      const path =
        clinic + "_" + purchase_date.toString().substring(4, 24) + "_" + name;

      console.log(db);
      // console.log(path)
      try {
        const docRef = await setDoc(doc(db, "orders", path), {
          clinic: clinic,
          supplier: supplier,
          manufacturer: manufacturer,
          name: name,
          quantity_ordered: quantity_ordered,
          product_id: product_id,
          status: status,
          purchase_date: purchase_date,
          delivery_date: null,
        });
        console.log("Updated document for: " + String(name));
      } catch (error) {
        console.error("Error adding document: ", error);
      }
    },
  },
};
</script>

<style scoped>
form {
  max-width: 570px;
  margin: 30px auto;
  background: rgb(131, 200, 247);
  text-align: left;
  padding: 40px;
  border-radius: 15px;
}
h1 {
  font-size: 2.5em;
  text-transform: uppercase;
  background: rgb(131, 200, 247);
  color: azure;
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
</style>
