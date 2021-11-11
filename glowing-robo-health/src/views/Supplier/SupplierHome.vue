<template>
  <div>
    <SupplierNavbar />
    <div style="padding: 40px;">
      <a-row>
          <a-col :xs="24" :lg="8">
              <div class="stat-box">
                <MedicineBoxTwoTone twoToneColor="#eb2f96"/>
                <div>
                  <h3>Number of clinics</h3>
                  <h2><b>{{this.numClinics}}</b></h2>
                </div>
              </div>
          </a-col>
          <a-col :xs="24" :lg="8">
              <div class="stat-box">
                <ContainerTwoTone/>
                <div>
                  <h3>Number of orders</h3>
                  <h2><b>{{this.numOrders}}</b></h2>
                </div>
              </div>
          </a-col>
          <a-col :xs="24" :lg="8">
              <div class="stat-box">
                <CarTwoTone twoToneColor="#52c41a"/>
                <div>
                  <h3>Average delivery time</h3>
                  <h2><b>{{this.avgDeliveryTime}}</b></h2>
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
import SupplierNavbar from '../../components/SupplierNavbar.vue';
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { MedicineBoxTwoTone, ContainerTwoTone, CarTwoTone } from '@ant-design/icons-vue';
import LineChart from '../../components/LineChart.vue';

export default {
  components: {
    SupplierNavbar,
    MedicineBoxTwoTone,
    ContainerTwoTone,
    CarTwoTone,
    LineChart
  },
  data() {
    return {
      numClinics: "499",
      numOrders: "69",
      avgDeliveryTime: "4 hours",
      user : {
        email: "",
        displayName: "",
        uid: ""
      }
    };
  },
  mounted() {
    const auth = getAuth();
    this.user = auth.currentUser
    onAuthStateChanged(auth, (user) => {
      if (user) {
        this.user = auth.currentUser;
      } else {
        console.log("not logged in");
      }
    });
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
