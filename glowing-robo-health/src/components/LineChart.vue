<template>
  <div>
    <canvas id="order-chart"></canvas>
  </div>
</template>

<script>
import Chart from "chart.js";
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

export default {
  name: "LineChart",
  data() {
    return {
      loaded: false,
      orderChartData: {
        type: "line",
        data: {
          // labels: ["2021-07-01", "2021-07-02", "2021-07-03", "2021-07-04", "2021-07-05", "2021-07-06", "2021-07-07", "2021-07-08"],
          labels: [
            "Jan",
            "Feb",
            "Mar",
            "Apr",
            "May",
            "Jun",
            "Jul",
            "Aug",
            "Sep",
            "Oct",
            "Nov",
            "Dec",
          ],
          datasets: [
            {
              label: "Number of orders",
              data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
              backgroundColor: "#1890ff30",
              borderColor: "#1890ff",
              borderWidth: 3,
            },
          ],
        },
        options: {
          responsive: true,
          lineTension: 1,
          scales: {
            yAxes: [
              {
                ticks: {
                  beginAtZero: true,
                  padding: 25,
                },
              },
            ],
          },
        },
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
        // console.log(this.orderChartData.data.datasets[0].data);
        // console.log(this.orderChartData);
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

      orders.forEach((doc) => {
        let data = doc.data();
        if (data.supplier == user_name) {
          let purchase_month = data.purchase_date.toDate().getMonth();
          this.orderChartData.data.datasets[0].data[purchase_month] += 1;
          // console.log(this.orderChartData.data.datasets[0].data);
          // this.loaded = true;
        }
        // console.log(this.orders);
      });
      const ctx = document.getElementById("order-chart");
      new Chart(ctx, this.orderChartData);
    },
  },
};
</script>
