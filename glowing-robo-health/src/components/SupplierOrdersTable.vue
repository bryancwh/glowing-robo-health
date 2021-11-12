<template>
  <div style="padding: 40px;">
    <h1><b>Orders</b></h1>
    <a-table :columns="columns" :data-source="orders" bordered>
      <template #action="{ record }">
        <a
          v-if="record.status === 'pending'"
          v-on:click="handleStatusChange(record.id)"
          >Deliver</a
        >
        <a
          v-if="record.status === 'delivered'"
          v-on:click="handleStatusChange(record.id)"
          >Undo Delivery</a
        >
      </template>
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
  where,
  setDoc,
  updateDoc,
} from "firebase/firestore";
import { getAuth, onAuthStateChanged } from "firebase/auth";

const db = getFirestore(firebaseApp);

const columns = [
  {
    dataIndex: "clinic",
    key: "clinic",
    title: "Clinic",
    sorter: (a, b) => {
      return a.clinic.localeCompare(b.clinic);
    },
  },
  {
    dataIndex: "name",
    key: "name",
    title: "Name",
    sorter: (a, b) => {
      return a.clinic.localeCompare(b.clinic);
    },
  },
  {
    title: "Manufacturer",
    dataIndex: "manufacturer",
    key: "manufacturer",
    sorter: (a, b) => {
      return a.manufacturer.localeCompare(b.manufacturer);
    },
  },
  // { title: 'Product ID', key: 'product_id', dataIndex: 'product_id', },
  {
    title: "Quantity",
    key: "quantity_ordered",
    dataIndex: "quantity_ordered",
    sorter: (a, b) => a.quantity_ordered - b.quantity_ordered,
  },
  {
    title: "Purchase Date",
    key: "purchase_date",
    dataIndex: "purchase_date",
    sorter: (a, b) => new Date(a.purchase_date) - new Date(b.purchase_date),
  },
  {
    title: "Delivery Date",
    key: "delivery_date",
    dataIndex: "delivery_date",
    sorter: (a, b) => new Date(a.purchase_date) - new Date(b.purchase_date),
  },
  {
    title: "Status",
    key: "status",
    dataIndex: "status",
    sorter: (a, b) => {
      return a.status.localeCompare(b.status);
    },
    filters: [
      {
        text: "pending",
        value: "pending",
      },
      {
        text: "delivered",
        value: "delivered",
      },
    ],
    onFilter: (value, record) => record.status.indexOf(value) === 0,
  },
  { title: "Update Status", key: "action", slots: { customRender: "action" } },
];

export default {
  mounted() {
    const auth = getAuth();
    this.user = auth.currentUser;
    onAuthStateChanged(auth, (user) => {
      if (user) {
        this.user = auth.currentUser;
        this.display();
      } else {
        console.log("not logged in");
      }
    });
  },
  data() {
    return {
      orders: [],
      columns,
      user: {
        email: "",
        displayName: "",
        uid: "",
      },
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
        let data = doc.data();
        if (data.supplier == user_name) {
          this.orders.push({
            id: doc.id,
            clinic: data.clinic,
            name: data.name,
            manufacturer: data.manufacturer,
            // product_id: data.product_id,
            quantity_ordered: data.quantity_ordered,
            purchase_date: data.purchase_date
              .toDate()
              .toString()
              .substring(3, 25),
            delivery_date: data.delivery_date
              ? data.delivery_date
                  .toDate()
                  .toString()
                  .substring(4, 24)
              : "Not delivered",
            status: data.status,
          });
        }
        // console.log(this.orders);
      });
    },
    async handleStatusChange(input) {
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

    //   console.log(updated_status);

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

      let clinic = x.data().clinic;
      let product = x.data().name;
      let status = x.data().status;
      let quantity_ordered = x.data().quantity_ordered;
      let ref = clinic + "_" + product;

      let stock_ref = doc(db, "stocks", ref);

      let y = await getDoc(stock_ref);
      let current_quantity = y.data().quantity;
      let updated_quantity =
        status == "pending"
          ? current_quantity + quantity_ordered
          : current_quantity - quantity_ordered;

      try {
        const docRef = await updateDoc(stock_ref, {
          quantity: updated_quantity,
        });
      } catch (err) {
        console.error("Error updating document : ", err);
      }
    },
  },
};
</script>
