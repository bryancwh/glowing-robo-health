<template>
  <div style="text-align:center;">
    <h1 id="mainHead">Glowing Robo Health Systems</h1>
    <div id="formlogin">
      <form id="login" method="post">
        <h1 id="login-header">Signup Page</h1>
        <div id="credential">
          <label class="white-text" for="email" id="label">
            Email Address</label
          >
          <input type="email" id="inputfield" v-model="email" />
        </div>

        <div id="credential">
          <label class="white-text" for="password" id="label"> Password</label>
          <input type="password" id="inputfield" v-model="password" />
        </div>

        <div id="credential">
          <label class="white-text" for="displayName" id="label">
            Display Name</label
          >
          <input type="text" id="inputfield" v-model="display_name" />
        </div>

        <div id="credential">
          <label class="white-text" for="role" id="role">
            Select User Type
          </label>
          <select v-model="selected_role" id="role-select">
            <option disabled value=""> User Type </option>
            <option> Clinic </option>
            <option> Supplier </option>
          </select>
        </div>

        <div id="buttons">
          <button v-on:click="back()" class="btn" id="backbutton">Back</button>
          <button v-on:click="signup" class="btn" id="signupbutton">
            Sign Up
          </button>
        </div>
      </form>

      <div id="pagecontent">
        Glowing Robo Health Systems™
      </div>
    </div>
  </div>
</template>

<script>
import firebase from "@/uifire.js";
import "firebase/compat/auth";
import * as firebaseui from "firebaseui";
import "firebaseui/dist/firebaseui.css";
import router from "../router/routes.js";
import firebaseApp from "../firebase.js";
import { getFirestore } from "firebase/firestore";
import { doc, collection, getDocs, setDoc, query } from "firebase/firestore";

const db = getFirestore(firebaseApp);

export default {
  name: "signup",
  data: function() {
    return {
      email: "",
      password: "",
      selected_role: "",
      displayName: "",
    };
  },
  methods: {
    back() {
      this.$router.push("/");
    },
    signup: function(e) {
      var roleSelected = this.selected_role;
      var displayName = this.display_name;

      console.log(displayName);
      firebase
        .auth()
        .createUserWithEmailAndPassword(this.email, this.password)
        .then(function(user) {
          console.log("uid", user.user.uid);
          var uid = user.user.uid;
          // user.user.updateProfile({
          //   displayName: displayName
          // });
          console.log(displayName);
          user.user.updateProfile({
            displayName: displayName,
          });
          const docRef = setDoc(doc(db, "users", uid), {
            UID: uid,
            role: roleSelected,
          });
        })
        .then(() => {
          alert("Successfully registered! Please login.");
          this.$router.push("/");
        })
        .catch((error) => {
          alert(error.message);
        });
      e.preventDefault();
    },
  },
};
</script>

<style scoped>
h1 {
  flex-direction: column;
  justify-content: center;
  text-align: center;
}
#formlogin {
  display: inline-block;
  background: rgb(160, 203, 216);
  width: 500px;
  height: 450px;
  border-radius: 15px;
  position: relative;
}

#pagecontent {
  height: 100px;
  font-size: larger;
  font-weight: bolder;
  text-align: center;
  position: relative;
  top: 200px;
  /* font-style: italic; */
}
#credential {
  position: relative;
  top: 50px;
  margin: 30px 10px 30px 10px;
}
#label {
  margin-right: 30px;
}

#inputfield {
  height: 20px;
  width: 150px;
}

#buttons {
  display: flex;
  justify-content: space-between;
  position: relative;
  top: 70px;
}

#login {
  display: inline-block;
  text-align: right;
}

#role-select {
  margin-left: 10px;
  height: 25px;
  width: 155px;
}

#mainHead {
  text-align: center;
  background: rgb(26, 83, 105);
  font-size: 35px;
  color: white;
  font-family: New Century Schoolbook, TeX Gyre Schola, serif;
  text-decoration: none;
  height: 70px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  /* height: 100px; */
  /* text-shadow: 2px 2px grey; */
}

#bg {
  display: block;
  margin-left: auto;
  margin-right: auto;
  width: 60%;
}

h5 {
  text-align: center;
  background-color: rgb(194, 202, 188);
}

#backbutton {
  margin-top: 30px;
  border-radius: 15px;
  background: rgb(187, 187, 187);
  width: 100px;
}

#signupbutton {
  margin-top: 30px;
  border-radius: 15px;
  background: cadetblue;
  width: 100px;
}
</style>
