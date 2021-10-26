<template>
    <div class ="container">
        <form >
            <h2>Add Appointments</h2>

            <div class = "formli" >            

                <!-- Patient Name -->
                <label for="patient">Patient Full Name:</label>
                <input type="text" id = "patient" required ="" placeholder="Patient's full name" v-model="a"> <br><br>      
                
                <!-- Email -->
                <label for="email">Email: </label>
                <input type="text" id = "email" required =""  placeholder="test@gmail.com" v-model="b"><br><br>     

                <!-- Visit Date -->
                <label for="date">Visit Date: </label>
                <input type="text" id = "date" required =""  placeholder="YYYY-MM-DD" v-model="c" ><br><br>
                
                <!-- Visit Time -->
                <label for="time">Time: </label>
                <input type="text" id = "time" required =""  placeholder="e.g. 3.00pm" v-model="d" ><br><br>

                <!-- Doctor -->
                <label for="doctor">Doctor's Name: </label>
                <input type="text" id = "doctor" required =""  placeholder="Doctor's name"  v-model="e"><br><br>

                <!-- Conditions -->
                <label for="conditions">Conditions: </label>
                <input type="text" id = "conditions" required =""  placeholder="Medical conditions"  v-model="f"><br><br>

                <div class ="save" >
                    <button  id = "savebutton"  type="button"  @click="savetofs()"> Save </button>
               </div>
            </div>
        </form> 
    </div>

</template>

<script>
// console.log("in AC")
import firebaseApp from '@/firebase.js';
import { getFirestore, Timestamp } from "firebase/firestore"
import { doc, setDoc } from "firebase/firestore";
// import { getAuth} from "firebase/auth";
// import { getFirestore, collection, getDocs } from 'firebase/firestore/lite';

const db = getFirestore(firebaseApp);

export default {

  data(){
    return{
      a:"", b:"", c:"", d:"", e:"", f:""
    }
  },

  methods: {
    
    async savetofs(){   
        
        // Function to generate random numbers for ID
        function getRandomId() {
            let output = ""
            for (let i = 0; i < 5; i++) {
                output = output + String(Math.floor(Math.random() * 9))
            }
            return output;
        }
        
        // Check to see if inputs are empty
        if (!((this.a ==""  || this.b == "")  || (this.c == "" || this.d == "" || this.e == "" || this.f == ""))){
            
            // Test if valid date
            let date = Timestamp.fromDate(new Date('2000-01-01'))

            try {
                date = Timestamp.fromDate(new Date(this.c));
                console.log(date)

            } catch (error) {
                console.log('Invalid date');
                date = Timestamp.fromDate(new Date('2000-01-01'));
            }

            // Generate document ID
            let datestring = String(date.toDate().getFullYear()) + String(date.toDate().getMonth() + 1).padStart(2, '0') + String(date.toDate().getDate()).padStart(2,'0')
            let doc_id = datestring + '-' + this.a.substring(0,3) + "-" + this.e.substring(0,3).replace(' ','_') + "-" + getRandomId()

            try{
                const docRef = await setDoc(doc(db, "schedules", doc_id),{ //, this.a),{
                    Name: this.a , Email : this.b, Visit_Date: date, Visit_Time: this.d, Doctor : this.e, Conditions: this.f
                })
                console.log(docRef)
                // Clear all fields
                this.a = this.b = this.c = this.d = this.e = this.f = "" 
                this.$emit("added")
                }
            catch(error) {
                console.error("Error adding document: ", error);
            }
        }
        else alert("Cannot take empty Values. Please enter the values")
  }
  }
}
 
</script>

<style scoped>
h2{
background-color: rgb(129, 184,99);
}

.formli{
display: inline-block;
text-align: right;
}

form {
  text-align: center;
  align-items: center;
  margin: auto;
}

input:hover {
  box-shadow: 3px 3px purple;
  border-radius: 2px
}

.save{
text-align: center ;
}
</style>
