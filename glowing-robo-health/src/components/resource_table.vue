<template>
    <h1 id = "Current"> <b> Resource table </b> </h1>
    <h1 id = "doctors"> <b> Doctors </b> </h1>
    <table id = "table" class = "auto-index" :key="count">
        <tr>
            <th>Type</th>
            <th>Department</th>       
            <th>Name</th>
            <th>Position</th>       
            <th>Email</th>
            <th>Status </th>
            <th>  </th>
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

    <h1 id = "Rooms"> <b> Rooms </b> </h1>
    <table id = "room" class = "auto-index" :key="count">
        <tr>
            <th>Room</th>
            <th>Location</th>       
            <th>Status </th>
            <th>  </th>
        </tr>
        <tr v-for="room in rooms" :key="room.firstName">
            <td>{{ room.Room }}</td>
            <td>{{ room.Location }}</td>
            <td v-bind:style="[room.Status == 'Available' ? {'color': 'green'} : { 'color': 'red'}]">{{ room.Status }}</td>
            <td>
                <button class="edt" id="room.firstName">Update</button>
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
            employees: [],
            rooms: []
        }
    },
    methods:{
        async display(){    
            let employees = await getDocs(collection(db,"Employees"))
            let rooms = await getDocs(collection(db, "Rooms"))
            employees.forEach(employee => {
                console.log("huehudehud", employee.data())
                this.employees.push(employee.data());
            })

            rooms.forEach(rooms => {
                this.rooms.push(rooms.data());
            })

            console.log('this eMPLOYEES' , this.employees)

        },                
    }
  }

</script>

<style>


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

    #doctors {
        background-color: #A9C1FD;
        color: #ffffff;
        text-align: center;
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