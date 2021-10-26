<template>
    <h1><b>Appointments</b></h1>    

    <table id = "table" class = "auto-index" :key="count">
        <tr>  
        <th>Name</th>       
        <th>Email</th>
        <th>Visit Date</th>
        <th>Visit Time</th>
        <th>Doctor</th>
        <th>Conditions</th>
        <th> </th>
        <th> </th>
        <th>Doc ID</th>
        </tr>
    </table><br><br>

</template>

<script>
import firebaseApp from '../firebase.js';
import { getFirestore } from "firebase/firestore"
import { collection, getDocs, doc, deleteDoc } from "firebase/firestore";
// import { getAuth} from "firebase/auth";

const db = getFirestore(firebaseApp);

export default {

  mounted(){
    this.display()
  },

  methods:{

    async display(){    
      let z = await getDocs(collection(db,"schedules"))
      let ind = 1 

      z.forEach((docs) => {
        // console.log(docs.id)
        let yy = docs.data()
        let doc_id = docs.id
        var table = document.getElementById("table")
        var row = table.insertRow(ind)

        var name = (yy.Name)
        var email = (yy.Email)
        var visit_date = (yy.Visit_Date)
        var visit_time = (yy.Visit_Time)
        var doctor = (yy.Doctor)
        var conditions = (yy.Conditions)

        var cell1 = row.insertCell(0); var cell2 = row.insertCell(1); var cell3 = row.insertCell(2);
        var cell4 = row.insertCell(3); var cell5 = row.insertCell(4); var cell6 = row.insertCell(5); 
        var cell7 = row.insertCell(6); var cell8 = row.insertCell(7); var cell9 = row.insertCell(8); 

        let date_text = String(visit_date.toDate().getDate()) + '/' + String(visit_date.toDate().getMonth() + 1) + '/' +String(visit_date.toDate().getFullYear())
        cell1.innerHTML = name; cell2.innerHTML = email; cell3.innerHTML = date_text; cell4.innerHTML = visit_time;
        cell5.innerHTML = doctor; cell6.innerHTML = conditions; cell9.innerHTML = doc_id;

        var edit = document.createElement("button")
        edit.className = "edt"
        edit.id = doc_id
        edit.innerHTML ="Edit"

        // Add edit function here for edit
        // bu.onclick =  ()=>{
        //   this.deleteinstrument2(coin,user)
        // }

        cell7.appendChild(edit) 
      
        var bu = document.createElement("button")
        bu.className = "bwt"
        bu.id = doc_id
        bu.innerHTML ="Delete"
        bu.onclick =  ()=>{
          this.deleteSchedule(doc_id)
        }
        cell8.appendChild(bu) 

        ind+= 1   
      }) 
    },                

     async deleteSchedule(doc_id){      
        alert("You are going to delete document ID: " + doc_id)
        await deleteDoc(doc(db,"schedules",doc_id))
        let tb = document.getElementById("table")
        //delete everything, make data empty and call the display again
        while (tb.rows.length >1){
          tb.deleteRow(1)
        }
        this.display(); 
      }
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

/* table {

  font-family: arial, sans-serif;
  border-collapse: collapse;
  width: 100%;
} */
table {
  border-radius: 10px;
    border-collapse: collapse;
    margin: 25px 0;
    font-size: 0.9em;
    font-family: sans-serif;
    /* min-width: 400px; */
    width: 100%;
    box-shadow: 0 0 40px rgba(0, 0, 0, 0.15);
}

tr:nth-child(even) {
  background-color: #ddf4ff;
}

th , td {
  border: 1px solid #dddddd;
  text-align: center;
  padding: 8px;
  /* color: blue; */
}

th {
  background-color: rgb(188, 188, 255);
  font-size: 1.2em;
}

.bwt{
    color:rgb(243, 236, 236);
    background-color: rgb(255, 94, 0);
    border-radius: 8px;
    font-size: 0.9em;
}

.edt{
    color:rgb(243, 236, 236);
    background-color: rgb(0, 68, 255);
    border-radius: 8px;
    font-size: 0.9em;
}

</style>