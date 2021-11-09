<template>
  <div style="display: flex; flex-direction: column; align-items: center;">
    <img src="../assets/logov2.png" style="height: 75px; margin-bottom: 40px;" alt="">

    <a-form id="login-box" method="post">
        <h1 style="margin-bottom: 48px;"><b>Create your account</b></h1>
        <a-alert v-if="this.error == 'emailtaken'" message="This email address has already been registered." type="error" style="width: 100%; margin-bottom: 20px;" show-icon />

        <a-alert v-if="this.error == 'weakpw'" message="Password should be at least 6 characters!" type="error" style="width: 100%; margin-bottom: 20px;" show-icon />


        <input 
          type="email" 
          v-model="email" 
          style="width: 320px; margin-bottom: 20px;" 
          placeholder="Enter your email" 
        />
        <input 
          type="password" 
          v-model="password"  
          style="width: 320px; margin-bottom: 20px;" placeholder="Password" 
        />
        <input 
          v-model="displayName" 
          style="width: 320px; margin-bottom: 20px;" 
          placeholder="Enter your name" 
        />

        <select v-model="selected_role" style="width: 100%; margin-bottom: 48px;">
          <option disabled value=""> User Type </option>
          <option> Clinic </option>
          <option> Supplier </option>
        </select>

        <a-button 
          v-if="!this.loading"
          v-on:click="signup"
          size="large" 
          type="primary" 
          style="margin-bottom: 48px; width: 100%;"
        >Sign up</a-button>
        <a-button 
          v-if="this.loading"
          size="large" 
          type="primary" 
          style="margin-bottom: 48px; width: 100%;"
        >Sign up</a-button>

        <span>Already have an account?</span>
        <a v-on:click="back()">Log in</a>
    </a-form>

    <aside id="left-pic"><img src="../assets/leftpic.svg"/></aside>
    <aside id="right-pic"><img src="../assets/rightpic.svg"/></aside>
  </div>
</template>

<script>
import firebase from "@/uifire.js";
import "firebase/compat/auth";
import "firebaseui/dist/firebaseui.css";
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
      loading: false,
      error: "",
    };
  },
  methods: {
    back() {
      this.$router.push("/");
    },
    signup: function(e) {
      this.loading = true;
      var roleSelected = this.selected_role;
      var displayName = this.displayName;

      firebase
        .auth()
        .createUserWithEmailAndPassword(this.email, this.password)
        .then(function(user) {
          var uid = user.user.uid;
          user.user.updateProfile({
            displayName: displayName,
          });
          const docRef = setDoc(doc(db, "users", uid), {
            UID: uid,
            role: roleSelected,
          });
        })
        .then(() => {
          if (roleSelected == "Clinic") {
            this.$router.push("/clinichome");
          } else if (roleSelected == "Supplier") {
            this.$router.push("/supplierhome");
          }
        })
        .catch((error) => {
          console.log('err code', error.code);
          console.log('err msg', error.message);
          if (error.code == 'auth/email-already-in-use') {
            this.error = "emailtaken";
          } else if (error.code == 'auth/weak-password') {
            this.error = "weakpw";
          }
        });
      e.preventDefault();
    },
    gotologin() {
      this.$router.push("/");
    }
  },
};
</script>

<style scoped>
  #login-box {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 48px 32px;
    border-radius: 16px;
    background-color: white;
    box-shadow: 0 9px 28px rgba(0, 0, 0, 0.05);
  }
  #left-pic {
    left: 2.5rem;
    display: flex;
    position: absolute;
    z-index: -1;
    bottom: 0;
  }
  #right-pic {
    right: 2.5rem;
    display: flex;
    position: absolute;
    z-index: -1;
    bottom: 0;
  }
</style>
