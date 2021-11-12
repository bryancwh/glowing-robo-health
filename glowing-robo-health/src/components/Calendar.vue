<template>
  <div v-if="orders">
    <!-- <h1  v-for="order in orders" v-bind:key="order.id">{{ order.purchase_day }}</h1> -->
    <a-calendar v-model="value">
      <template #dateCellRender="{ current: value }">
        <ul class="events">
          <li v-for="item in getListData(value)" :key="item.content">
            <a-badge :status="item.type" :text="item.content" />
          </li>
        </ul>
      </template>
      <template #monthCellRender="{ current: value }">
        <div v-if="this.getMonthData(value)" class="notes-month">
          <section>{{ this.getMonthData(value) }}</section>
          <span>Backlog number</span>
        </div>
      </template>
    </a-calendar>
  </div>
</template>

<script>
import { defineComponent, ref } from 'vue';
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

export default defineComponent({
  data() {
    return {
      user: {
        email: "",
        displayName: "",
        uid: "",
      },
      useremail: "",
      orders: [],
    };
  },
  mounted() {
    const auth = getAuth();
    this.user = auth.currentUser;
    onAuthStateChanged(auth, (user) => {
      if (user) {
        this.user = auth.currentUser;
        this.pullData();
      } else {
        console.log("not logged in");
      }
    });
  },
  methods: {
    async pullData() {
      const path = query(
        collection(db, "orders/")
      );
      
      var user_name = this.user.email.slice(0, this.user.email.indexOf("@"));

      let orders = await getDocs(path);
      orders.forEach((doc) => {
        let data = doc.data();
        if (data.clinic === user_name) {
          this.orders.push({
            id: doc.id,
            clinic: data.clinic,
            name: data.name,
            manufacturer: data.manufacturer,
            quantity_ordered: data.quantity_ordered,
            purchase_date_day: data.purchase_date.toDate().getDate(),
            purchase_date_month: data.purchase_date.toDate().getMonth() + 1,
            // purchase_date: data.purchase_date.toDate().toString().substring(3, 25),
            status: data.status,
            delivery_date: data.delivery_date ? data.delivery_date.toDate().toString().substring(4, 24) : 'Not delivered',
            supplier: data.supplier,
          });
        }
      });
    },
  },
  
  setup() {
    const value = ref();
    const getListData = value => {
      let listData;

      // for (var i = 0 ; i < this.orders.length; i++) {
      //   if (value.date() == this.orders.purchase_date_day) {
      //     listData = [
      //       {
      //         type: 'warning',
      //         content: 'This is warning event.',
      //       },
      //       {
      //         type: 'success',
      //         content: 'This is usual event.',
      //       },
      //     ];
      //   }
      // }
      // return listData || [];

      switch (value.date()) {
        case 3: 
          listData = [
            {
              type: 'error',
              content: 'Xanax failed to deliver'
            }
          ];
          break;
        case 8:
          listData = [
            {
              type: 'warning',
              content: 'Panadol purchased',
            },
            {
              type: 'success',
              content: 'Ivermectin purchased',
            },
          ];
          break;

        case 10:
          listData = [
            {
              type: 'success',
              content: 'supplier_1 delivered Panadol.',
            },
            {
              type: 'success',
              content: 'supplier_2 delivered Marijuana',
            },
          ];
          break;

        default:
      }

      return listData || [];
    };
  
    return {
      value,
      getListData,
      // getMonthData,
    };
  },
});
</script>
<style scoped>
.events {
  list-style: none;
  margin: 0;
  padding: 0;
}
.events .ant-badge-status {
  overflow: hidden;
  white-space: nowrap;
  width: 100%;
  text-overflow: ellipsis;
  font-size: 12px;
}
.notes-month {
  text-align: center;
  font-size: 28px;
}
.notes-month section {
  font-size: 28px;
}
</style>