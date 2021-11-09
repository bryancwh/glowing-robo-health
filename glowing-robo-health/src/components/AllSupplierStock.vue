<template>
  <div style="padding: 40px">
   <h1><b>Suppliers</b></h1>
    <a-table
      :columns="columns"
      :data-source="stocks"
      bordered
    >
    </a-table>
  </div>
</template>

<script>
import firebaseApp from "../firebase.js";
import { getFirestore } from "firebase/firestore";
import { collection, getDocs, setDoc, query } from "firebase/firestore";

const db = getFirestore(firebaseApp);

const columns = [
  { dataIndex: 'user_name', key: 'user_name', title: 'Supplier' },
  { dataIndex: 'product_name', key: 'product_name', title: 'Product' },
  { title: 'Manufacturer', dataIndex: 'product_manufacturer', key: 'product_manufacturer' },
  { title: 'Product ID', key: 'product_id', dataIndex: 'product_id', },
  { title: 'Availability', key: 'availability', dataIndex: 'availability'},
];

export default {
  mounted() {
    this.display();
  },
  data() {
    return {
      columns,
      stocks: [],
    };
  },
  methods: {
    async display() {
      const path = query(collection(db, "stocks/"));

      let stocks = await getDocs(path);

      stocks.forEach((doc) => {
        let data = doc.data();
        if (data.type === "supplier") {
          this.stocks.push({
            type: data.type,
            user_name: data.user_name,
            product_id: data.product_id,
            product_name: data.product_name,
            product_manufacturer: data.product_manufacturer,
            quantity: data.quantity,
            availability: data.quantity > 0 ? 'Available' : 'Out of stock'
          });
        }
      });
    },
  },
};
</script>
