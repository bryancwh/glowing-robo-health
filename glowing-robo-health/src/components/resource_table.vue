<template>
    <h1 id = "Current"> <b> Resource table </b> </h1>
    <table id = "table" class = "auto-index" :key="count">
        <tr>
            <th>Type</th>
            <th>Department</th>       
            <th>Name</th>
            <th>Position</th>       
            <th>Email</th>
            <th>Status </th>
            <th> button here </th>
        </tr>
        <tr v-for="person in employees" :key="person.firstName">
            <td>{{ person.firstName + " " + person.lastName }}</td>
            <td>{{ person.Type }}</td>
            <td>{{ person.Department }}</td>
            <td>{{ person.Position }}</td>
            <td>{{ person.Email }}</td>
            <td v-bind:style="[person.Status == 'Available' ? {'color': 'green'} : { 'color': 'red'}]">{{ person.Status }}</td>
            <td>
                <button class="edt" id="person.firstName">Update</button>
            </td>
        </tr>
    </table><br><br>

  
</template>

<script>
import firebaseApp from '../firebase.js';
import { getFirestore } from "firebase/firestore"
import { collection, getDocs } from "firebase/firestore";

const db = getFirestore(firebaseApp);
export default {
    mounted() {
        this.display()
    },
    data () {
        return {
            employees: []
        }
    },
    methods:{
        async display(){    
            let employees = await getDocs(collection(db,"Employees"))
            employees.forEach(employee => {
                console.log("huehudehud", employee.data())
                this.employees.push(employee.data());
            })
            console.log('this eMPLOYEES' , this.employees)

        },                
    }
  }

</script>

<style>
    h1,h2 {
    text-align: center;
    background-color: rgb(129, 184, 99);
    font: 700;
    display: block;
    font-size: 2em;
    margin-block-start: 0.67em;
    margin-block-end: 0.67em;
    margin-inline-start: 0px;
    margin-inline-end: 0px;
    font-weight: bold;
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