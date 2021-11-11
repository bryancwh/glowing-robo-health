<template>
  <!-- <form v-on:submit.prevent> -->
  <div style="padding: 40px">
   <h1><b>Order Form</b></h1>

  <form>
    <h2><b>Add New Stock</b></h2>
    <label>Supplier:</label>
    <select v-model="supplier" style="width: 100%; margin-bottom: 12px;">
      <option v-for="supplier of this.suppliers" v-bind:key="supplier">{{supplier}} </option>
    </select>
    <label>Manufacturer:</label>
    <select v-model="manufacturer" style="width: 100%; margin-bottom: 12px;">
      <option v-for="manufacturer of this.manufacturers" v-bind:key="manufacturer">{{manufacturer}} </option>
    </select>
    <label>Product Name:</label>
    <input style="margin-bottom: 12px" type="text" id="name" required v-model="name" />
    <label>Quantity:</label>
    <input style="margin-bottom: 28px" type="number" id="stock_level" required v-model="stock_level" />
    <label>Threshold:</label>
    <input style="margin-bottom: 28px" type="number" id="threshold" required v-model="threshold" />
    <a-button type="primary" v-on:click="submitOrder()">Submit Order</a-button>
  </form>

  </div>
</template>

<script>
import firebaseApp from "../firebase.js";
import { getFirestore } from "firebase/firestore";
import { doc, getDocs, setDoc, query, collection } from "firebase/firestore";
import { getAuth, onAuthStateChanged } from "firebase/auth";

const db = getFirestore(firebaseApp);
export default {
  mounted() {
    const auth = getAuth();
    this.user = auth.currentUser;
    onAuthStateChanged(auth, (user) => {
      if (user) {
        this.user = auth.currentUser;
        console.log(this.user);
        console.log(this.user.email);
        this.getData();
      } else {
        console.log("not logged in");
      }
    });

  },
  data() {
    return {
      name: "",
      quantity: "",
      supplier:"",
      manufacturer:"",
      stock_level:"",
      user: {
        email: "",
        displayName: "",
        uid: "",
      },
      suppliers:[],
      manufacturers:[]
    };
  },
  methods: {
    async getData() {
      const path = query(collection(db, "stocks/"));
      let stocks = await getDocs(path);

      stocks.forEach((doc) => {
        let data = doc.data();
        if (data.type === "supplier") {
          if (!this.suppliers.includes(data.user_name)) {
            this.suppliers.push(data.user_name);
          }
          if (!this.manufacturers.includes(data.product_manufacturer)) {
            this.manufacturers.push(data.product_manufacturer);
          }
        }
      });
      console.log(this.manufacturers)
    },

    async submitOrder() {
      // var clinic = document.getElementById("clinic").value;
      var email = this.user.email;
      var user_name = email.slice(0, email.indexOf("@"));
      var supplier = this.supplier;
      var manufacturer = this.manufacturer;
      var name = this.name;
      var quantity_ordered = this.stock_level;
      // var product_id = 1;
      var status = "pending";
      var purchase_date = new Date();
      //   const path = this.name;
      const path =
        user_name +
        "_" +
        purchase_date.toString().substring(4, 24) +
        "_" +
        name;

      try {
        const docRef = await setDoc(doc(db, "orders", path), {
          clinic: user_name,
          supplier: supplier,
          manufacturer: manufacturer,
          name: name,
          quantity_ordered: quantity_ordered,
          // product_id: product_id,
          status: status,
          purchase_date: purchase_date,
          delivery_date: null,
        });
        this.name = this.stock_level = this.supplier = this.manufacturer = ""
        console.log("Updated document for: " + String(name));
        alert("Order submitted!");
      } catch (error) {
        console.error("Error adding document: ", error);
      }
    },
  },
};
</script>

<style scoped>

form {
  display: flex;
  flex-direction: column;
  padding: 32px;
  border: 1px solid #E2E8F0;
  border-radius: 16px;
  width: 350px;
}
</style>
