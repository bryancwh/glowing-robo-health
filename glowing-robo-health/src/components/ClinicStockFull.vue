<template>
  <div>
    <div>
      <h1 class="header">Clinic Stockpile</h1>
    </div>
    <div class="table_divider">
      <table id="table" class="auto-index" :key="count">
        <tr>
          <th>Product</th>
          <th>Manufacturer</th>
          <th>Product ID</th>
          <th>Stock Level</th>
          <th>Stock Availability</th>
          <th></th>
          <th></th>
        </tr>
        <tr v-for="stock in stocks" :key="stock.user_name">
          <td>{{ stock.product_name }}</td>
          <td>{{ stock.product_manufacturer }}</td>
          <td>{{ stock.product_id }}</td>
          <td>{{ stock.quantity }}</td>
          <td v-if="stock.quantity > 0">Available</td>
          <td v-else:>Out of Stock</td>
          <td>
            <button @click="deleteProduct(stock.product_name)" class="edt">
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
        <input type="text" id="product_name" required v-model="product_name" />

        <label>Manufacturer:</label>
        <input
          type="text"
          id="product_manufacturer"
          required
          v-model="product_manufacturer"
        />

        <label>Product ID:</label>
        <input type="text" id="product_id" required v-model="product_id" />

        <label>Quantity:</label>
        <input type="number" id="quantity" required v-model="quantity" />

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
        this.display();
      } else {
        console.log("not logged in");
      }
    });
  },
  data() {
    return {
      name: "",
      stock_level: "",
      manufacturer: "",
      product_id: "",
      stocks: [],
      user: {
        email: "",
        displayName: "",
        uid: "",
      },
    };
  },
  methods: {
    async updateQuantity() {
      var product_name = document.getElementById("product_name").value;
      var product_manufacturer = document.getElementById("product_manufacturer")
        .value;
      var product_id = document.getElementById("product_id").value;
      var quantity = document.getElementById("quantity").value;

      var type = "clinic";
      var email = this.user.email;
      var user_name = email.slice(0, email.indexOf("@"));
      var document_id = user_name + "_" + product_name;
      const path = document_id + "/";
      try {
        const docRef = await setDoc(doc(db, "stocks", path), {
          type: type,
          user_name: user_name,
          product_name: product_name,
          product_manufacturer: product_manufacturer,
          product_id: product_id,
          quantity: quantity,
        });
        console.log("Updated document for: " + String(user_name));
        let tb = document.getElementById("table");
        while (tb.rows.length > 1) {
          tb.deleteRow(1);
        }

        this.display();
        alert("Successfully added stock: " + this.product_name);
        this.product_name = this.quantity = this.product_manufacturer = this.product_id =
          "";
      } catch (error) {
        console.error("Error adding document: ", error);
      }
    },

    async deleteProduct(medicine_name) {
      var email = this.user.email;
      var user_name = email.slice(0, email.indexOf("@"));
      var document_id = user_name + "_" + medicine_name;
      const path = document_id + "/";
      alert("You are going to delete " + medicine_name);
      try {
        await deleteDoc(doc(db, "stocks", path));

        console.log("Deleted document: " + medicine_name);
      } catch (error) {
        console.error("Error deleting document: ", error);
      }
      let tb = document.getElementById("table");
      while (tb.rows.length > 1) {
        tb.deleteRow(1);
      }
      this.display();
    },

    async display() {
      const path = query(collection(db, "stocks/"));
      var email = this.user.email;
      var user_name = email.slice(0, email.indexOf("@"));

      let stocks = await getDocs(path);

      stocks.forEach((doc) => {
        let data = doc.data();
        if (data.type == "clinic" && data.user_name == user_name) {
          this.stocks.push({
            type: data.type,
            user_name: data.user_name,
            product_id: data.product_id,
            product_name: data.product_name,
            product_manufacturer: data.product_manufacturer,
            quantity: data.quantity,
          });
        }
      });
    },
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
