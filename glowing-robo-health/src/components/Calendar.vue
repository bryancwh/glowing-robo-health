<template>
  <a-calendar v-model="value">
    <template #dateCellRender="{ current: value }">
      <ul class="events">
        <li v-for="item in getListData(value)" :key="item.content">
          <a-badge :status="item.type" :text="item.content" />
        </li>
      </ul>
    </template>
    <template #monthCellRender="{ current: value }">
      <div v-if="getMonthData(value)" class="notes-month">
        <section>{{ getMonthData(value) }}</section>
        <span>Backlog number</span>
      </div>
    </template>
  </a-calendar>
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
  setup() {
    const value = ref();

    const getListData = value => {
      let listData;

      switch (value.date()) {
        case 16:
          listData = [
            {
              type: 'warning',
              content: 'This is warning event.',
            },
            {
              type: 'success',
              content: 'This is usual event.',
            },
          ];
          break;

        case 10:
          listData = [
            {
              type: 'warning',
              content: 'This is warning event.',
            },
            {
              type: 'success',
              content: 'This is usual event.',
            },
            {
              type: 'error',
              content: 'This is error event.',
            },
          ];
          break;

        default:
      }

      return listData || [];
    };

    const getMonthData = value => {
      if (value.month() === 20) {
        return 1394;
      }
    };

    return {
      value,
      getListData,
      getMonthData,
    };
  },
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
            product_id: data.product_id,
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