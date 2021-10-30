<template>
    <!-- <form v-on:submit.prevent> -->
    <form>
        <label>name:</label>
        <input type= "text" id = "name" required v-model="name">

        <label>Quantity:</label>
        <input type = "number" id = "quantity" required v-model="qty">

        <div class="buttonHolder"> 
            <button type ="button" v-on:click="updateQuantity()"> Update </button> 
        </div>
    </form>
</template>

<script>
    import firebaseApp from "../firebase.js";

    import {getFirestore} from "firebase/firestore";
    import {doc,getDocs, setDoc, query, collection} from "firebase/firestore";
   
    const db = getFirestore(firebaseApp);
    // 
    export default {
        data() {
            return {
                name: "",
                quantity: ""
            }
        },
        methods:{
            async updateQuantity() {
                var name = document.getElementById("name").value
                var qty = document.getElementById("quantity").value
                const path = "clinic/clinic_1/" + this.name;
                console.log(db)
                console.log(path)
                try {
                    const docRef = await setDoc(doc(db, "stock", path), {
                        stock_level: qty
                    })

                } catch (error) {
                    console.error("Error adding document: ", error);
                }
            }
        }
    }
</script>

<style>
    form {
        max-width: 420px;
        margin: 30px auto;
        background: whtie;
        text-align: left;
        padding: 40px;
        border-radius: 10px;
    }
    label {
        color: #aaa;
        display: inline-block;
        margin: 25px 0 15px;
        font-size: 0.6em;
        text-transform: uppercase;
        letter-spacing: 1px;
        font-weight: bold;
    }
    input {
        display: block;
        padding: 10px 6px;
        width: 100%;
        box-sizing: ;
        border: none;
        border-bottom: 1px solid #ddd;
        color: #555;
    }
    .buttonHolder {
        padding: 20px;
        text-align: center;
    }
</style>