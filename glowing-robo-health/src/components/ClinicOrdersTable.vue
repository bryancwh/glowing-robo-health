<template>
  <div style="padding: 40px">
    <h1><b>Orders</b></h1>
    <a-table
      :columns="columns"
      :data-source="orders"
      bordered
    >
    </a-table>
  </div>
</template>

<script>
import firebaseApp from "../firebase.js";
import { getDoc, doc, getFirestore } from "firebase/firestore";
import {
  collection,
  getDocs,
  query,
  updateDoc,
} from "firebase/firestore";
import { getAuth, onAuthStateChanged } from "firebase/auth";

const db = getFirestore(firebaseApp);

const columns = [
  {
    dataIndex: 'supplier',
    key: 'supplier',
    title: 'Supplier',
    sorter: (a, b) => { return a.supplier.localeCompare(b.supplier)},
  },
  {
    title: 'Name',
    dataIndex: 'name',
    key: 'name',
    sorter: (a, b) => { return a.name.localeCompare(b.name)},
  },
  {
    title: 'Manufacturer',
    dataIndex: 'manufacturer',
    key: 'manufacturer',
    sorter: (a, b) => { return a.manufacturer.localeCompare(b.manufacturer)},
  },
  // {
  //   title: 'Product ID',
  //   key: 'product_id',
  //   dataIndex: 'product_id',
  // },
  {
    title: 'Purchase Date',
    key: 'purchase_date',
    dataIndex: 'purchase_date',
     sorter: (a, b) => new Date(a.purchase_date) - new Date(b.purchase_date)
  },
  {
    title: 'Delivery Date',
    key: 'delivery_date',
    dataIndex: 'delivery_date',
    sorter: (a, b) => new Date(a.delivery_date) - new Date(b.delivery_date),
    filters: [
      {
        text: 'Not delivered',
        value: 'Not delivered'
      }
    ],
    onFilter: (value, record) => record.delivery_date.indexOf(value) === 0,
  },
  {
    title: 'Status',
    key: 'status',
    dataIndex: 'status',
    sorter: (a, b) => { return a.status.localeCompare(b.status)},
    filters: [
      {
        text: 'pending',
        value: 'pending'
      },
      {
        text: 'delivered',
        value: 'delivered'
      }
    ],
    onFilter: (value, record) => record.status.indexOf(value) === 0,
  },
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
      orders: [],
      emits: ["changeData"],
      columns,
    };
  },
  methods: {
    handlePendingSelected(pending) {
      return pending == "pending";
    },
    handleDeliveredSelected(delivered) {
      return delivered == "delivered";
    },
    async display() {
      const path = query(
        collection(db, "orders/")
        // where("clinic", "==", this.clinic)
      );

      var email = this.user.email;
      var user_name = email.slice(0, email.indexOf("@"));

      let orders = await getDocs(path);

      orders.forEach((doc) => {
        console.log(doc.data());
        let data = doc.data();
        if (data.clinic === user_name) {
          this.orders.push({
            id: doc.id,
            clinic: data.clinic,
            name: data.name,
            manufacturer: data.manufacturer,
            // product_id: data.product_id,
            quantity_ordered: data.quantity_ordered,
            purchase_date: data.purchase_date.toDate().toString().substring(3, 25),
            status: data.status,
            delivery_date: data.delivery_date ? data.delivery_date.toDate().toString().substring(4, 24) : 'Not delivered',
            supplier: data.supplier,
          });
        }
      });
    },
    async handleStatusChange(input) {
      console.log("changed", input);

      let doc_ref = doc(db, "orders", input);

      let x = await getDoc(doc_ref);

      let updated_status = x.data().status;
      let delivery_date = x.data().delivery_date;
      if (updated_status == "pending") {
        updated_status = "delivered";
        delivery_date = new Date();
      } else {
        updated_status = "pending";
        delivery_date = null;
      }

      console.log(updated_status);

      try {
        const docRef = await updateDoc(doc_ref, {
          status: updated_status,
          delivery_date: delivery_date,
        });
      } catch (err) {
        console.error("Error adding document : ", err);
      }

      let tb = document.getElementsByTagName("table")[0];
      while (tb.rows.length > 1) {
        tb.deleteRow(1);
      }
      this.display();
    },
  },
};
</script>

<style>
table {
  box-shadow: none !important;
}

th span, td {
  font-size: 14px;
}
th span {
  font-weight: bold !important;
}

</style>