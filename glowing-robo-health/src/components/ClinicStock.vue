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
    <button class="update">
        Update Stock
    </button >
        
    <button class="add">
        Add Stock
    </button>
  </div>
</template>

<script>
import firebaseApp from '../firebase.js';
import { getFirestore } from "firebase/firestore"
import { collection, getDocs, setDoc, query} from "firebase/firestore";


const db = getFirestore(firebaseApp);

export default {
    mounted() {
        this.display()
    },
    data () {
        return {
            stocks: [],
        }
    },
    methods:{
        async display(){
            const path = query(collection(db, "stock/clinic/clinic_1"));
            let stock = await getDocs(path);
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
  }

</script>

<style>
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