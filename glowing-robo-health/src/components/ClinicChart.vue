<template>
  <div>
    <bar-chart
      v-if="this.loaded"
      :data="chartData"
      height="300px"
      legend="right"
    ></bar-chart>
  </div>
</template>

<script>
import firebaseApp from "../firebase.js";
import { getDoc, doc, getFirestore } from "firebase/firestore";
import { collection, getDocs, query, updateDoc } from "firebase/firestore";
import { getAuth, onAuthStateChanged } from "firebase/auth";

const db = getFirestore(firebaseApp);

export default {
  beforeMount() {
    const auth = getAuth();
    this.user = auth.currentUser;
    onAuthStateChanged(auth, (user) => {
      if (user) {
        this.user = auth.currentUser;
        console.log(this.user);
        console.log(this.user.email);
        this.getData();
        console.log("getting data");
      } else {
        console.log("not logged in");
      }
    });
  },
  data() {
    return {
      loaded: false,
      chartData: [
        {
          name: "target",
          data: [],
        },
        {
          name: "stock",
          data: [],
        },
      ],
    };
  },

  methods: {
    async getData() {
      const path = query(collection(db, "stocks/"));

      var email = this.user.email;
      var user_name = email.slice(0, email.indexOf("@"));

      let stocks = await getDocs(path);

      stocks.forEach((doc) => {
        console.log(doc.data());
        let data = doc.data();
        if (data.user_name === user_name) {
          var name = data.product_name;
          var threshold = parseInt(data.threshold);
          var quantity = parseInt(data.quantity);

          if (quantity < threshold) {
            var arr = [name, threshold];
            var arr_1 = [name, quantity];

            this.chartData[0].data.push(arr);
            this.chartData[1].data.push(arr_1);
          }

          console.log(this.chartData);
          this.loaded = true;

          console.log("added 1 arr");
        }
      });
      console.log("done adding data", this.chartData);
    },
  },
};
</script>

<style></style>
