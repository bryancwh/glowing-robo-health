<template>
  <!-- <form v-on:submit.prevent> -->
  <div>
    <!-- <div>
      <h1 class="header">Order Form</h1>
    </div> -->
    <div class="form_divider">
      <form>
        <h1>Create Order</h1>

        <!-- <label>Clinic:</label>
        <input type="text" id="clinic" required v-model="clinic" /> -->

        <label>Supplier:</label>
        <input type="text" id="supplier" required v-model="supplier" />

        <label>Manufacturer:</label>
        <input type="text" id="manufacturer" required v-model="manufacturer" />

        <label>Product Name:</label>
        <input type="text" id="name" required v-model="name" />

        <label>Quantity:</label>
        <input type="number" id="stock_level" required v-model="stock_level" />

        <div class="buttonHolder">
          <button type="button" v-on:click="submitOrder()" class="btn">
            Submit Order
          </button>
        </div>
      </form>
    </div>
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
    };
  },
  methods: {
    async submitOrder() {
      // var clinic = document.getElementById("clinic").value;
      var email = this.user.email;
      var user_name = email.slice(0, email.indexOf("@"));
      var supplier = document.getElementById("supplier").value;
      var manufacturer = document.getElementById("manufacturer").value;
      var name = document.getElementById("name").value;
      var quantity_ordered = document.getElementById("stock_level").value;
      var product_id = 1;
      var status = "pending";
      var purchase_date = new Date();
      //   const path = this.name;
      const path =
        user_name +
        "_" +
        purchase_date.toString().substring(4, 24) +
        "_" +
        name;

      console.log(db);
      // console.log(path)
      try {
        const docRef = await setDoc(doc(db, "orders", path), {
          clinic: user_name,
          supplier: supplier,
          manufacturer: manufacturer,
          name: name,
          quantity_ordered: quantity_ordered,
          product_id: product_id,
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
.header {
  width: 70%;
  height: 20%;
  color: black;
  background-color: None;
  position: relative;
  text-align: left;
  top: 70px;
  /* left: 80px; */
}

.form_divider {
  border-radius: 25px;
  border: 2px solid white;
  padding: 10px;
  background-color: white;
  width: 37%;
  height: 517px;
  position: fixed;
  top: 55%;
  left: 50%;
  -webkit-transform: translate(-50%, -50%);
  transform: translate(-50%, -50%);
  overflow: auto;
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
  width: 100px;
}
.btn:hover {
  background-color: black;
  color: white;
}
</style>
