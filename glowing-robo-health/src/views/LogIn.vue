<template>
  <div style="text-align:center;">
    <h1 id="mainHead">Glowing Robo Health Systems</h1>
    <div id="formlogin">
      <form id="login" method="post">
        <h1 id="login-header">Login Page</h1>
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

        <div id="buttons">
          <button v-on:click="gotosignup" class="btn" id="signuppage">
            Sign Up
          </button>
          <button v-on:click="login" class="btn" id="loginbutton">Login</button>
        </div>
      </form>

      <!-- <div id="firebaseui-auth-container"></div> -->
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
import { doc, collection, getDoc, setDoc, query } from "firebase/firestore";
import {
  getAuth,
  setPersistence,
  signInWithEmailAndPassword,
  browserSessionPersistence,
} from "firebase/auth";
const db = getFirestore(firebaseApp);

export default {
  name: "Login",
  data: function() {
    return {
      email: "",
      password: "",
    };
  },
  methods: {
    login: function(e) {
      const auth = getAuth();
      setPersistence(auth, browserSessionPersistence).then(() => {
        signInWithEmailAndPassword(auth, this.email, this.password).then(
          async (user) => {
            alert(`You are logged in as ${this.email}`);
            var id = user.user.uid;
            console.log(id);
            const docRef = await getDoc(doc(db, "users", id));
            const role = docRef.data().role;
            if (role == "Clinic") {
              this.$router.push("/clinichome");
            } else if (role == "Supplier") {
              this.$router.push("/supplierhome");
            }
          },
          (err) => {
            alert(err.message);
          }
        );
      });

      e.preventDefault();
    },
    gotosignup: function(e) {
      this.$router.push("/signup");
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
  height: 350px;
  border-radius: 15px;
  position: relative;
}

#pagecontent {
  font-size: larger;
  font-weight: bolder;
  text-align: center;
  position: relative;
  top: 280px;

  /* font-style: italic; */
}

#credential {
  /* margin-top: 30px; */
  position: relative;
  top: 30px;
  margin: 40px 10px 40px 10px;
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
  justify-content: space-around;
  position: relative;
  top: 50px;
}

#login {
  display: inline-block;
  text-align: right;
}

#mainHead {
  text-align: center;
  background: rgb(26, 83, 105);
  font-size: 35px;
  color: white;
  /* height: 100px; */
  /* text-shadow: 2px 2px grey; */
  font-family: New Century Schoolbook, TeX Gyre Schola, serif;
  text-decoration: none;
  height: 70px;
  display: flex;
  flex-direction: column;
  justify-content: center;
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

#loginbutton {
  margin-top: 30px;
  border-radius: 15px;
  background: cadetblue;
  width: 100px;
}

#signuppage {
  margin-top: 30px;
  border-radius: 15px;
  background: rgb(187, 187, 187);
  width: 100px;
}
</style>
