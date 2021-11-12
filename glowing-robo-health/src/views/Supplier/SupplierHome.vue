<template>
  <div>
    <SupplierNavbar />
    <div style="padding: 40px;">
      <h1>Welcome, {{ this.user.displayName }}!</h1>
      <a-row>
        <a-col :xs="24" :lg="8">
          <div class="stat-box">
            <MedicineBoxTwoTone twoToneColor="#eb2f96" />
            <div>
              <h3>Number of clinics</h3>
              <h2>
                <b>{{ this.numClinics }}</b>
              </h2>
            </div>
          </div>
        </a-col>
        <a-col :xs="24" :lg="8">
          <div class="stat-box">
            <ContainerTwoTone />
            <div>
              <h3>Number of orders</h3>
              <h2>
                <b>{{ this.numOrders }}</b>
              </h2>
            </div>
          </div>
        </a-col>
        <a-col :xs="24" :lg="8">
          <div class="stat-box">
            <CarTwoTone twoToneColor="#52c41a" />
            <div>
              <h3>Average delivery time</h3>
              <h2>
                <b>{{ this.avgDeliveryTime }}</b>
              </h2>
            </div>
          </div>
        </a-col>
      </a-row>
      <div class="card">
        <h2><b>Number of Orders over time</b></h2>
        <LineChart />
      </div>
    </div>
  </div>
</template>

<script>
import SupplierNavbar from "../../components/SupplierNavbar.vue";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import {
  MedicineBoxTwoTone,
  ContainerTwoTone,
  CarTwoTone,
} from "@ant-design/icons-vue";
import LineChart from "../../components/LineChart.vue";
import firebaseApp from "../../firebase.js";
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
  components: {
    SupplierNavbar,
    MedicineBoxTwoTone,
    ContainerTwoTone,
    CarTwoTone,
    LineChart,
  },
  data() {
    return {
      numClinics: 0,
      numOrders: 0,
      avgDeliveryTime: "",
      user: {
        email: "",
        displayName: "",
        uid: "",
      },
    };
  },
  mounted() {
    const auth = getAuth();
    this.user = auth.currentUser;
    onAuthStateChanged(auth, (user) => {
      if (user) {
        this.user = auth.currentUser;
        this.display();
        console.log(this.user, "this.user");
      } else {
        console.log("not logged in");
      }
    });
  },
  methods: {
    async display() {
      const path = query(collection(db, "orders/"));

      var email = this.user.email;
      var user_name = email.slice(0, email.indexOf("@"));

      let orders = await getDocs(path);
      let clinics = [];
      let delivered = 0;
      let total_delivery = 0;

      orders.forEach((doc) => {
        let data = doc.data();
        if (data.supplier == user_name) {
          this.numOrders += 1;
          clinics.push(data.clinic);
          if (data.status == "delivered") {
            delivered += 1;
            let time_taken =
              data.delivery_date.toDate() - data.purchase_date.toDate();
            total_delivery += time_taken / (1000 * 3600 * 24);
          }
        }

        // console.log(this.numOrders);
      });
      console.log(total_delivery / delivered);
      // console.log((total_delivery / delivered).toFixed(2));
      let avg_days = (total_delivery / delivered).toFixed(2);

      this.avgDeliveryTime = avg_days + " days";
      // console.log(total_delivery / delivered);
      this.numClinics = new Set(clinics).size;
    },
  },
};
</script>

<style scoped>
.stat-box {
  border: 1px solid var(--black10);
  padding: 20px 28px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 16px;
  transition: 200ms;
  border-radius: 16px;
}

/* .stat-box:hover {
  box-shadow: var(--shadow);
} */

.stat-box h3 {
  color: var(--black50);
  margin: 0;
}
.stat-box h2 {
  color: var(--black70);
  margin: 0;
}

.stat-box :deep(.anticon) {
  font-size: 32px;
}

.card {
  border: 1px solid var(--black10);
  padding: 20px 28px;
  border-radius: 16px;
  width: 100%;
  margin: 16px;
  max-width: 800px;
}
</style>
