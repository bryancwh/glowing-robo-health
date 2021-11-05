<template>
  <button id="btn" @click="signOut()" v-if="user">Logout</button>
</template>

<script>
import { getAuth, onAuthStateChanged, signOut } from "firebase/auth";

export default {
  name: "Logout",

  data() {
    return {
      user: false,
    };
  },

  mounted() {
    const auth = getAuth();
    onAuthStateChanged(auth, (user) => {
      if (user) {
        this.user = user;
      }
    });
  },
  methods: {
    signOut() {
      console.log("HAHA");
      const auth = getAuth();
      const user = auth.currentUser;
      signOut(auth, user);
      this.$router.push("/");
    },
  },
};
</script>

<style scoped>
#btn {
  /* position: relative;
  top: 25px;
  left: 15px;
  text-align: center;
  margin: auto; */
  text-decoration: none;
  float: left;
  padding: 10px;
  margin: 15px;
  color: white;
  width: 75px;
  /* background-color: black; */
  background-color: rgb(26, 83, 105);
  transition: width 0.35s;
  -webkit-transition: width 0.35s;
  overflow: hidden;
  font-family: Comic Sans MS, Comic Sans, cursive;
  font-size: 16px;
  border: none;
}

#btn:hover {
  color: black;
  background-color: rgb(245, 127, 127);
  /* box-shadow: 3px 3px grey; */
}
</style>
