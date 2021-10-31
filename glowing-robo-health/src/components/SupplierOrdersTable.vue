<template>
  <div>
    <table id="table" class="auto-index" :key="count">
      <tr>
        <th>Clinic</th>
        <th>Name</th>
        <th>Manufacturer</th>
        <th>Product ID</th>
        <th>Quantity Ordered</th>
        <th>Purchase Date</th>
        <th>Status</th>
        <th>Update Status</th>
      </tr>
      <tr v-for="order in orders" :key="order.name">
        <td>{{ order.clinic }}</td>
        <td>{{ order.name }}</td>
        <td>{{ order.manufacturer }}</td>
        <td>{{ order.product_id }}</td>
        <td>{{ order.quantity_ordered }}</td>
        <td>{{ order.purchase_date.toDate() }}</td>
        <td>{{ order.status }}</td>

        <td>
          <button
            class="edt"
            id="order.id"
            @click="handleStatusChange(order.id)"
          >
            Update
          </button>
          <!-- <button
            class="edt"
            id="order.id"
            @click="handleStatusChange(order.id)"
            v-if="(order.status = 'pending')"
          >
            Delivered
          </button>
          <button
            class="edt"
            id="order.id"
            @click="handleStatusChange(order.id)"
            v-if="(order.status = 'delivered')"
          >
            Pending
          </button> -->
          <!-- <form>
            <select
              name="status"
              id="form-select"
              @change="handleStatusChange(order.id)"
            >
              >
              <option value="pending">Pending</option>
              <option value="delivered">Delivered</option>
            </select>
          </form> -->
        </td>
      </tr>
    </table>
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

const db = getFirestore(firebaseApp);

export default {
  mounted() {
    this.display();
  },
  data() {
    return {
      orders: [],
      emits: ["changeData"],
      //   clinic: "clinic_1",
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
      let orders = await getDocs(path);

      orders.forEach((doc) => {
        console.log(doc.data());
        let data = doc.data();

        this.orders.push({
          id: doc.id,
          clinic: data.clinic,
          name: data.name,
          manufacturer: data.manufacturer,
          product_id: data.product_id,
          quantity_ordered: data.quantity_ordered,
          purchase_date: data.purchase_date,
          status: data.status,
        });

        // console.log(this.orders);
      });
    },
    async handleStatusChange(input) {
      // this.$emit("changeData", "test");

      console.log("changed", input);

      // var e = document.getElementById("form-select");
      // console.log(e);
      // var updated_status = e.value;
      // var updated_status = "delivered";

      let doc_ref = doc(db, "orders", input);

      let x = await getDoc(doc_ref);

      // const doc = await getDoc(dov_ref);
      let updated_status = x.data().status;
      if (updated_status == "pending") {
        updated_status = "delivered";
      } else {
        updated_status = "pending";
      }

      console.log(updated_status);

      try {
        const docRef = await updateDoc(doc_ref, {
          status: updated_status,
        });
        // console.log(docRef);
      } catch (err) {
        console.error("Error adding document : ", err);
      }

      let tb = document.getElementById("table");
      while (tb.rows.length > 1) {
        tb.deleteRow(1);
      }
      this.display();
    },
  },
};
</script>

<style>
h1,
h2 {
  text-align: left;
  padding-left: 30px;
  background-color: #a9c1fd;
  color: #ffffff;
  font: 700;
  display: block;
  font-size: 2em;
  margin-block-start: 0.67em;
  margin-block-end: 0.67em;
  margin-inline-start: 0px;
  margin-inline-end: 0px;
  font-weight: bold;
}

#Current {
  background-color: #1f58e7;
  color: #ffffff;
}
#Rooms {
  background-color: #a9c1fd;
  color: #ffffff;
  text-align: center;
}

table {
  font-family: arial, sans-serif;
  border-collapse: collapse;
  width: 100%;
}

td {
  border: 1px solid #dddddd;
  text-align: center;
  padding: 8px;
}
.th_one {
  color: #00bb3b;
  text-align: center;
  padding: 8px;
}
.th_two {
  color: #bb0300;
  text-align: center;
  padding: 8px;
}
</style>
