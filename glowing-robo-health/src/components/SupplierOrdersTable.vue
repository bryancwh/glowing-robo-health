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
      </tr>
      <tr v-for="order in orders" :key="order.name">
        <td>{{ order.clinic }}</td>
        <td>{{ order.name }}</td>
        <td>{{ order.manufacturer }}</td>
        <td>{{ order.product_id }}</td>
        <td>{{ order.quantity_ordered }}</td>
        <td>{{ order.purchase_date.toDate() }}</td>

        <!-- <td v-if="order.stock_level > 0"> Available </td>
            <td v-else:> Out of Stock</td> -->
        <!-- <td v-bind:style="[medicine.stock_level > 0 ? {'color': 'red'} : { 'color': 'green'}]">{{ medicine.Status }}</td> -->
        <td>
          <!-- <button class="edt" id="order.name" >Update</button> -->
          <form>
            <select
              name="status"
              id="{{order.id}}"
              @change="handleStatusChange()"
            >
              <option value="pending">Pending</option>
              <option value="delivered">Delivered</option>
            </select>
          </form>
        </td>
      </tr>
    </table>
  </div>
</template>

<script>
import firebaseApp from "../firebase.js";
import { getFirestore } from "firebase/firestore";
import { collection, getDocs, query, where } from "firebase/firestore";

const db = getFirestore(firebaseApp);

export default {
  mounted() {
    this.display();
  },
  data() {
    return {
      orders: [],
      //   clinic: "clinic_1",
    };
  },
  methods: {
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
          id: data.id,
          clinic: data.clinic,
          name: data.name,
          manufacturer: data.manufacturer,
          product_id: data.product_id,
          quantity_ordered: data.quantity_ordered,
          purchase_date: data.purchase_date,
        });
      });
    },
    handleStatusChange(input) {
      console.log("changed", input);
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
