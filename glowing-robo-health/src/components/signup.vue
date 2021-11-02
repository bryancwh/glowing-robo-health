<template>
    <div style="text-align:center;">    
        <h1  id = "mainHead"> SIGN UP PAGE </h1>
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

                <div id= "credential">
                    <label class="white-text" for="role" id = "role"> Select User Type </label>
                    <select name="roles" id="role-select">
                        <option value = ""> User Type </option>
                        <option value = "clinic"> Clinic </option>
                        <option value = "supplier"> Supplier </option>
                    </select>
                </div>

                <div id = "buttons">
                    <button v-on:click="back" class = "btn" id ="backbutton"> Back </button>
                    <button v-on:click="signup" class = "btn" id ="signupbutton"> Sign Up </button>
                </div>

            </form>

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
import router from "../router/routes.js"

export default {
    name:"signup",
    data: function() {
        return {
            email: "",
            password: ""
        };
    },
    methods: {
        back: function(e) {
            this.$router.push('/auth');
        },
        signup: function(e) {
            console.log("asdfasfd");
        }
        
    },

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
    position: fixed;
    bottom:0;
    
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

#buttons {
    display: flex;
    justify-content: space-around;
}

#login{
    display: inline-block;
    text-align: right;
}

#role-select{
    margin-left: 10px;
    height: 25px;
    width:155px;
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

#backbutton{
    margin-top: 30px;
    border-radius: 15px;
    background:aliceblue;
    width:100px;
}

#signupbutton{
    margin-top: 30px;
    border-radius: 15px;
    background:aliceblue;
    width:100px;
}
</style>


