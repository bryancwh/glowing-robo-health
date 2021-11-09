<template>
  <div style="padding: 40px;">
    <h1><b>Supplier Stockpile</b></h1>
    <a-row type="flex" :gutter="32">
      <a-col :flex="3">
        <a-alert v-if="this.successAdded" message="Successfully added!" type="success" />
        <a-alert v-if="this.successDeleted" message="Successfully deleted!" type="success" />
        <a-table id="table" :columns="columns" :data-source="stocks" bordered >          
          <template #action="{ record }">
            <a-popconfirm
              title="Confirm delete?"
              @confirm="deleteProduct(record.product_name)"
            >
              <a>Delete</a>
            </a-popconfirm>
          </template>
        </a-table>
      </a-col>

      <a-col :flex="2">
        <form>
          <h2><b>Add New Stock</b></h2>
          <label>Medicine Name:</label>
          <input style="margin-bottom: 12px" type="text" id="product_name" required v-model="form_product_name" />
          <label>Manufacturer:</label>
          <input
            type="text"
            style="margin-bottom: 12px"
            id="product_manufacturer"
            required
            v-model="form_product_manufacturer"
          />
          <label>Product ID:</label>
          <input type="text" style="margin-bottom: 12px" id="product_id" required v-model="form_product_id" />
          <label>Quantity:</label>
          <input style="margin-bottom: 28px" type="number" id="quantity" required v-model="form_quantity" />
          <a-button type="primary" v-on:click="updateQuantity()">Add Stock</a-button>
        </form>
      </a-col>
    </a-row>
    
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

const columns = [
  { dataIndex: 'product_name', key: 'product_name', title: 'Product' },
  { title: 'Manufacturer', dataIndex: 'product_manufacturer', key: 'product_manufacturer' },
  { title: 'Product ID', key: 'product_id', dataIndex: 'product_id', },
  { title: 'Stock Quantity', key: 'quantity', dataIndex: 'quantity' },
  { title: 'Availability', key: 'availability', dataIndex: 'availability'},
  { title: 'Action', key: 'action', slots: { customRender: 'action' }, },
];


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
      columns,
      stock_level: "",
      manufacturer: "",
      product_id: "",
      stocks: [],
      user: {
        email: "",
        displayName: "",
        uid: "",
      },
      form_product_name: "",
      form_product_manufacturer: "",
      form_product_id: "",
      form_quantity: "",
      successAdded: false,
      successDeleted: false,
    };
  },
  methods: {
    async updateQuantity() {
      var product_name = this.form_product_name;
      var product_manufacturer = this.form_product_manufacturer;
      var product_id = this.form_product_id;
      var quantity = this.form_quantity;

      var type = "supplier";
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

        this.product_name = this.quantity = this.product_manufacturer = this.product_id = "";
        this.successAdded = true;

      } catch (error) {
        console.error("Error adding document: ", error);
      }
      let tb = document.getElementsByTagName("table")[0];

      while (tb.rows.length > 1) {
        tb.deleteRow(1);
      }
      this.display();
    },

    async deleteProduct(medicine_name) {
      var email = this.user.email;
      var user_name = email.slice(0, email.indexOf("@"));
      var document_id = user_name + "_" + medicine_name;
      const path = document_id + "/";
      // alert("You are going to delete " + medicine_name);
      try {
        await deleteDoc(doc(db, "stocks", path));

        console.log("Deleted document: " + medicine_name);
        this.successDeleted = true;

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
        if (data.type == "supplier" && data.user_name == user_name) {
          this.stocks.push({
            type: data.type,
            user_name: data.user_name,
            product_id: data.product_id,
            product_name: data.product_name,
            product_manufacturer: data.product_manufacturer,
            quantity: data.quantity,
            availability: data.quantity > 0 ? 'Available' : 'Out of stock',

          });
        }
      });
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
}
</style>
