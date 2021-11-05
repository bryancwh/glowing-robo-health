<template>
  <div style="text-align:center;">
    <h1 id="mainHead">Glowing Robo Health Systems</h1>
    <div id="formlogin">
      <form id="login" method="post">
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

      <div id="firebaseui-auth-container"></div>
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
import { getAuth, setPersistence, signInWithEmailAndPassword, browserSessionPersistence } from "firebase/auth";
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
      setPersistence(auth, browserSessionPersistence)
        .then( () => {
          signInWithEmailAndPassword(auth, this.email, this.password)
          .then(
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
        })
        
      e.preventDefault();
    },
    gotosignup: function(e) {
      this.$router.push("/signup");
    },
  },

  mounted() {
    var ui = firebaseui.auth.AuthUI.getInstance();
    console.log("first ui is", ui);
    if (!ui) {
      ui = new firebaseui.auth.AuthUI(firebase.auth());
      console.log("Inside !ui is ", ui);
    }

    var uiConfig = {
      signInSuccessUrl: "/home",
      // signInSuccessUrl: this.$router.replace("/profile"),
      signInOptions: [
        firebase.auth.GoogleAuthProvider.PROVIDER_ID,
        // firebase.auth.FacebookAuthProvider.PROVIDER_ID,
        // firebase.auth.TwitterAuthProvider.PROVIDER_ID,
        // firebase.auth.GithubAuthProvider.PROVIDER_ID,
        //firebase.auth.EmailAuthProvider.PROVIDER_ID,
        // firebase.auth.PhoneAuthProvider.PROVIDER_ID,
        // firebaseui.auth.AnonymousAuthProvider.PROVIDER_ID
      ],
    };
    ui.start("#firebaseui-auth-container", uiConfig);
  },
};
</script>

<style scoped>
#formlogin {
  display: inline-block;
  background: rgb(160, 203, 216);
  width: 500px;
  height: 350px;
  border-radius: 15px;
}
#firebaseui-auth-container {
  display: inline-block;
  width: 300px;
  margin-top: 80px;
}

#pagecontent {
  font-size: larger;
  font-weight: bolder;
  text-align: center;

  /* font-style: italic; */
}

#credential {
  margin-top: 30px;
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
}

#login {
  display: inline-block;
  text-align: right;
}

#mainHead {
  text-align: center;
  background: cadetblue;
  font-size: 40px;
  /* height: 100px; */
  text-shadow: 2px 2px grey;
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
