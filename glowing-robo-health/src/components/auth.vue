<template>
    <div style="text-align:center;">    
        <h1  id = "mainHead"> Glowing Robo Health Systems </h1>
        <div id ="formlogin"> 
            <form id="login" method='post'>

                <div id = "credential">
                    <label class="white-text" for="email" id = "label"> Email Address</label>
                    <input type="email" id="inputfield" v-model= "email">
                </div>

                <div id= "credential">
                    <label class="white-text" for="password" id = "label"> password</label>
                    <input type="password" id="inputfield" v-model= "password">
                </div>

                <div>
                    <button v-on:click="login" class = "btn" id ="loginbutton"> Login </button>
                </div>
            </form>
            
            <div id= "firebaseui-auth-container"></div>
            <div id= "firebaseui-auth-container"></div>
            <div id="pagecontent">
                Glowing Robo Health Systems™
            </div>
        </div>
        
    </div>   
</template>

<script>
import firebase from '@/uifire.js'
import 'firebase/compat/auth';
import * as firebaseui from 'firebaseui'
import 'firebaseui/dist/firebaseui.css'

export default {
    name:"Login",
    data: function() {
        return {
            email: "",
            password: ""
        };
    },
    methods: {
        login: function(e) {
            firebase
                .auth()
                .signInWithEmailAndPassword(this.email, this.password)
                .then(
                    user => {
                        alert(`You are logged in as ${this.email}`);
                    },
                    err => {
                        alert(err.message);
                    }
                );
                e.preventDefault();
        }
    },

    mounted() {
        var ui = firebaseui.auth.AuthUI.getInstance();
        console.log("first ui is",ui)
        if (!ui){
        ui = new firebaseui.auth.AuthUI(firebase.auth());
        console.log("Inside !ui is ", ui)
        }      

        var uiConfig = {
            signInSuccessUrl: '/home',
            // signInSuccessUrl: this.$router.replace("/profile"),
            signInOptions: [
            firebase.auth.GoogleAuthProvider.PROVIDER_ID,
            // firebase.auth.FacebookAuthProvider.PROVIDER_ID,
            // firebase.auth.TwitterAuthProvider.PROVIDER_ID,
            // firebase.auth.GithubAuthProvider.PROVIDER_ID,
            firebase.auth.EmailAuthProvider.PROVIDER_ID,
            // firebase.auth.PhoneAuthProvider.PROVIDER_ID,
            // firebaseui.auth.AnonymousAuthProvider.PROVIDER_ID
            ]
            
        };
        ui.start("#firebaseui-auth-container", uiConfig)    
    }
}
</script>

<style scoped>
#formlogin{
    display: inline-block;
}
#firebaseui-auth-container{
    width: 300px;
    margin-top:80px;
    margin-bottom: 50px;
}

#pagecontent{
    height: 100px;
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

#inputfield{
    height: 20px;
    width: 150px;
}


#login{
    display: inline-block;
    text-align: right;
}

#mainHead{
    text-align: center;
    background: cadetblue;
    font-size: 40px;
    /* height: 100px; */
    text-shadow: 2px 2px grey;
}

#bg{
    display: block;
    margin-left: auto;
    margin-right: auto;
    width: 60%;
}

h5{
    text-align: center;
    background-color:rgb(194, 202, 188) ;
}

#loginbutton{
    margin-top: 30px;
    border-radius: 15px;
    background:aliceblue;
    width:100px;
}

</style>


