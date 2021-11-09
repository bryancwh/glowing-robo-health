<template>
  <div style="display: flex; flex-direction: column; align-items: center;">
    <img src="../assets/logov2.png" style="height: 75px; margin-bottom: 80px;" alt="">

    <a-form id="login-box" method="post">
        <h1 style="margin-bottom: 48px;"><b>Welcome back!</b></h1>
        <a-alert v-if="this.haveError" message="Incorrect email or password!" type="error" style="width: 100%; margin-bottom: 20px;" show-icon />
        <input 
          type="email" 
          v-model="email" 
          size="large" 
          style="width: 320px; margin-bottom: 20px;" 
          placeholder="Enter your email" 
        />
        <input 
          type="password" 
          v-model="password"  
          size="large" style="width: 320px; margin-bottom: 48px;" placeholder="Password" />

        <a-button 
          v-on:click="login"
          size="large" 
          type="primary" 
          style="margin-bottom: 48px; width: 100%;"
        >Log in</a-button>

        <span>Don't have an account?</span>
        <a v-on:click="gotosignup">Sign up</a>
    </a-form>

    <aside id="left-pic"><img src="../assets/leftpic.svg"/></aside>
    <aside id="right-pic"><img src="../assets/rightpic.svg"/></aside>
  </div>
</template>

<script>
  import "firebase/compat/auth";
  import "firebaseui/dist/firebaseui.css";
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
        haveError: false
      };
    },
    methods: {
      login: function(e) {
        const auth = getAuth();
        setPersistence(auth, browserSessionPersistence).then(() => {
          signInWithEmailAndPassword(auth, this.email, this.password).then(
            async (user) => {
              // alert(`You are logged in as ${this.email}`);
              var id = user.user.uid;
              const docRef = await getDoc(doc(db, "users", id));
              const role = docRef.data().role;
              if (role == "Clinic") {
                this.$router.push("/clinichome");
              } else if (role == "Supplier") {
                this.$router.push("/supplierhome");
              }
            },
            (err) => {
              this.haveError = true;
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
