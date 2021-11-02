<template>
<div>
    <table id = "table" class = "auto-index" :key="count">
        <tr>
            <th>Name</th>
            <th>Manufacturer</th>       
            <th>Product ID</th>
            <th>Stock Level</th>       
            <th>Stock Availability</th>
            <th>  </th>
            <th>  </th>
        </tr>
        <tr v-for="medicine in stocks" :key="medicine.firstName">
            <td>{{ medicine.name }}</td>
            <td>{{ medicine.manufacturer }}</td>
            <td>{{ medicine.product_id }}</td>
            <td>{{ medicine.stock_level }}</td>
            <td v-if="medicine.stock_level > 0"> Available </td>
            <td v-else:> Out of Stock</td>
            <!-- <td v-bind:style="[medicine.stock_level > 0 ? {'color': 'red'} : { 'color': 'green'}]">{{ medicine.Status }}</td> -->
            <td>
                <button @click="deleteProduct()">Delete</button>
            </td>
            <td>
                <button>Update</button>
            </td>
        </tr>
    </table>

    <!-- <form v-on:submit.prevent> -->
    <form>
        <div id = "form_header">Add Stocks</div>

        <label>Medicine Name:</label>
        <input type= "text" id = "name" required v-model="name">

        <label>Manufacturer:</label>
        <input type= "text" id = "manufacturer" required v-model="manufacturer">

        <label>Product ID:</label>
        <input type= "text" id = "product_id" required v-model="product_id">

        <label>Quantity:</label>
        <input type = "number" id = "stock_level" required v-model="stock_level">

        <div class="buttonHolder"> 
            <button type ="button" v-on:click="updateQuantity()"> Add Stock </button> 
        </div>
    </form>

  </div>
</template>

<script>
import firebaseApp from '../firebase.js';
import { getFirestore } from "firebase/firestore"
import { doc, collection, getDocs, setDoc, query } from "firebase/firestore";

const db = getFirestore(firebaseApp);

export default {
    mounted() {
        this.display()
    },
    data () {
        return {
            name: "",
            stock_level: "",
            manufacturer: "",
            product_id: "",
            stocks: [],
        }
    },
    methods:{
        async updateQuantity() {
            var name = document.getElementById("name").value
            var stock_level = document.getElementById("stock_level").value
            var manufacturer = document.getElementById("manufacturer").value
            var product_id = document.getElementById("product_id").value
            const path = "clinic/clinic_1/" + this.name;
            console.log(db)
            console.log(path)
            try {
                const docRef = await setDoc(doc(db, "stock", path), {
                    stock_level: stock_level,
                    manufacturer: manufacturer,
                    name: name,
                    product_id: product_id
                })
                console.log('Updated document for: ' + String(name))
                this.display()
                alert('Successfully added stock: ' + this.name)
                this.name=this.stock_level=this.manufacturer=this.product_id = ""
            } catch (error) {
                console.error("Error adding document: ", error);
            }
        },
        async display(){
            const path = query(collection(db, "stock/clinic/clinic_1"));
            let stock = await getDocs(path);
            this.stocks = []
            stock.forEach((doc) => {
                console.log("huehudehud", doc.data())
                this.stocks.push(doc.data());
            })
            console.log('this eMPLOYEES' , this.doc)
        },
        // updateProduct() {

        // }
    }
  }

</script>

<style scoped>

    form {
        max-width: 570px;
        margin: 30px auto;
        background: rgb(131, 200, 247);
        text-align: left;
        padding: 40px;
        border-radius: 15px;
    }
    #form_header {
        font-size: 2.5em;
        text-transform: uppercase;
        background: rgb(131, 200, 247);
        color:azure;
        text-align: center;
    }
    label {
        color: rgb(0, 0, 0);
        display: inline-block;
        margin: 10px 0 10px;
        font-size: 0.8em;
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
        border-left: 1px solid #ddd;
        border-right: 1px solid #ddd;
        border-top: 1px solid #ddd;
        border-bottom: 2px solid #ddd;
        color: #555;
        border-radius: 8px;
    }
    .buttonHolder {
        padding: 20px;
        text-align: center;
    }

    .update {
        background-color: rgb(34, 191, 34);
        margin-right: 10px;
        width: 100px;
    }
    .add {
        background-color: rgb(34, 191, 34);
        margin-left: 10px;
        width: 100px;
    }

    h1,h2 {
    text-align: left;
    padding-left: 30px;
    background-color: #A9C1FD;
    color: #ffffff;
    font: 700;
    display: block;
    font-size: 2em;
    margin-block-start: 0.67em;
    margin-block-end: 0.67em;
    margin-inline-start: 0px;
    margin-inline-end: 0px;
    font-weight: bold;
    }

    #Current {
        background-color: #1F58E7;
        color: #ffffff;
        
    }
    #Rooms {
        background-color: #A9C1FD;
        color: #ffffff;
        text-align: center;
    }
    
    table {
        font-family:arial, sans-serif;
        border-collapse: collapse;
        width: 100%;
    }

    td {
        border: 1px solid #dddddd;
        text-align: center;
        padding: 8px;
    }   
    .th_one {
        color: #00bb3b;
        text-align: center;
        padding: 8px;
    }
    .th_two {
        color : #bb0300;
        text-align: center;
        padding: 8px;
    }  
</style>