<template>
    <div>
        <Navbar />
        <div style="padding: 40px;">    
          <h1><b>Messaging</b></h1>
        </div>
        <div class="container">
            <div class="messaging">
                <div class="inbox_msg">
                    <div class="inbox_people">
                    <div class="headind_srch">
                        <div class="recent_heading">
                        <h4>Recents</h4>
                        </div>
                    </div>
                    <div class="inbox_chat" >
                        <div v-for="user in users" :key="user" class="chat_list" v-on:click="getChat(user.uid, user.name)">
                            <div class="chat_people">
                                <div class="chat_img"> <img src="https://ptetutorials.com/images/user-profile.png" alt="sunil"> </div>
                                <div class="chat_ib">
                                <h5>{{user.name}}</h5>
                                <p>Press to start conversation with this {{user.role}}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    </div>
                    <div class="mesgs">
                      <div class="msg_heading">
                        <h4>{{this.receiver_name}}</h4>
                      </div>
                      <div class="msg_history">
                          <div v-if="!messages.length"> 
                            <p class="no_msg">No messages here yet..</p>
                          </div>
                          <div v-else v-for="item in messages" :key="item">
                              <div :class="[item.uid==this.user.uid?'sent_msg':'received_msg']">
                                  <div class='received_withd_msg'>
                                      <p>{{item.message}}</p>
                                      <span class="time_date"> {{item.createdAt}} | {{item.author}} </span> <div></div>
                                  </div>
                              </div>
                          </div>

                      </div>
                      <div class="type_msg">
                          <div class="input_msg_write">
                          <input @keyup.enter="saveMessage" v-model="message" type="text" class="write_msg" placeholder="Type a message" />
                          <button class="msg_send_btn" type="button"><i class="fa fa-paper-plane-o" aria-hidden="true"></i></button>
                          </div>
                      </div>
                    </div>
                </div>                
            </div>
        </div>
    </div>
</template>

<script>
import Navbar from '../../components/Navbar.vue';
import firebaseApp from "../../firebase.js";
import { getFirestore } from "firebase/firestore";
import {
  doc,
  collection,
  deleteDoc,
  getDocs,
  setDoc,
  addDoc,
  query,
  orderBy
} from "firebase/firestore";
import { getAuth, onAuthStateChanged } from "firebase/auth";

const db = getFirestore(firebaseApp);

export default {
    components: {
        Navbar
    },
    mounted() {
        const auth = getAuth();
        this.user = auth.currentUser
        onAuthStateChanged(auth, (user) => {
        if (user) {
            this.user = auth.currentUser;
            console.log(this.user, "this.user")
            this.fetchUsers()
        } else {
            console.log("not logged in");
        }
        });
    },
    data() {
        return {
            message: null,
            messages: [],
            users: [],
            receiver: null,
            receiver_name: null
        }
    },
    methods: {
        async saveMessage(){
            try {
                const docRef = await addDoc(collection(db, "chat"), {
                    message: this.message,
                    uid: this.user.uid,
                    createdAt: new Date(),
                    author: this.user.displayName,
                    receiver: this.receiver
                });
                console.log("Successfully added document");
                this.messages=[]
                this.message=''
                this.getChat(this.receiver);
            } catch (error) {
                console.log("Error adding document: ", error);
            }
        },
        async fetchUsers(){
            const path = query(collection(db, "users/"));
            let allUsers = await getDocs(path);
            allUsers.forEach((doc) => {
                let data = doc.data();
                if (data.UID != this.user.uid) {
                    this.users.push({
                        uid: data.UID,
                        role: data.role,
                        name: data.displayName
                    }); 
                }
            });
            console.log("fetched messages", this.messages)
        },
        async getChat(id, name){
            this.messages=[]
            this.receiver = id
            this.receiver_name = name
            console.log(this.receiver)
            const path = query(collection(db, "chat/"), orderBy('createdAt'));
            let allChat = await getDocs(path);
            allChat.forEach((doc) => {
                let data = doc.data();
                if ((data.receiver == this.receiver && data.uid == this.user.uid) || (data.receiver == this.user.uid && data.uid == this.receiver)) {
                    this.messages.push({
                        message: data.message,
                        uid: data.uid,
                        createdAt: data.createdAt.toDate().toDateString(),
                        author: data.author,
                        receiver: data.receiver
                    });
                }
            });
            console.log("fetched messages", this.messages)
        }
    }
}
</script>

<style>
.container{max-width:90%; margin:auto;}
img{ max-width:100%;}
.inbox_people {
  background: #f8f8f8 none repeat scroll 0 0;
  float: left;
  overflow: hidden;
  width: 40%; border-right:1px solid #c4c4c4;
}
.inbox_msg {
  border: 1px solid #c4c4c4;
  clear: both;
  overflow: hidden;
}
.top_spac{ margin: 20px 0 0;}


.recent_heading {float: left; width:40%;}
.srch_bar {
  display: inline-block;
  text-align: right;
  width: 60%;
}
.headind_srch{ padding:10px 29px 10px 20px; overflow:hidden; border-bottom:1px solid #c4c4c4;}

.recent_heading h4 {
  color: #05728f;
  font-size: 21px;
  margin: auto;
}

.srch_bar input{ border:1px solid #cdcdcd; border-width:0 0 1px 0; width:80%; padding:2px 0 4px 6px; background:none;}
.srch_bar .input-group-addon button {
  background: rgba(0, 0, 0, 0) none repeat scroll 0 0;
  border: medium none;
  padding: 0;
  color: #707070;
  font-size: 18px;
}
.srch_bar .input-group-addon { margin: 0 0 0 -27px;}

.chat_ib h5{ font-size:15px; color:#464646; margin:0 0 8px 0;}
.chat_ib h5 span{ font-size:13px; float:right;}
.chat_ib p{ font-size:14px; color:#989898; margin:auto}
.chat_img {
  float: left;
  width: 11%;
}
.chat_ib {
  float: left;
  padding: 0 0 0 15px;
  width: 88%;
}

.chat_people{ overflow:hidden; clear:both; }

.chat_list:hover, .chat_people:focus{
  background:#ebebeb;   
}

.chat_list {
  border-bottom: 1px solid #c4c4c4;
  margin: 0;
  padding: 18px 16px 10px;
}
.inbox_chat { height: 550px; overflow-y: scroll;}

.incoming_msg_img {
  display: inline-block;
  width: 6%;
}
.received_msg {
  display: inline-block;
  padding: 0 0 0 10px;
  vertical-align: top;
  width: 60%;
 }

 .sent_msg {
  float: right;
  display: inline-block;
  padding: 0 0 0 10px;
  vertical-align: top;
  position: relative;
  width: 60%;
}

 .received_withd_msg p {
  background: #ebebeb none repeat scroll 0 0;
  border-radius: 3px;
  color: #646464;
  font-size: 14px;
  margin: 0;
  padding: 5px 10px 5px 12px;
  width: 90%;
}

.sent_msg p {
  background: #05728f none repeat scroll 0 0;
  border-radius: 3px;
  font-size: 14px;
  margin: 0; color:#fff;
  padding: 5px 10px 5px 12px;
  width:90%;
}

.time_date {
  color: #747474;
  display: block;
  font-size: 12px;
  margin: 8px 0 0;
}
.received_withd_msg { width: 100%;}

.mesgs {
  float: left;
  padding: 30px 15px 0 25px;
  width: 60%;
}

.outgoing_msg{ overflow:hidden; margin:26px 0 26px;}

.input_msg_write input {
  background: rgba(0, 0, 0, 0) none repeat scroll 0 0;
  border: medium none;
  color: #4c4c4c;
  font-size: 15px;
  min-height: 48px;
  width: 100%;
}
.msg_heading {
  border-bottom: 1px solid #c4c4c4;
  position: relative; 
  margin-bottom: 20px;
  text-align: center;
}

.type_msg {border-top: 1px solid #c4c4c4;position: relative;}
.msg_send_btn {
  background: #05728f none repeat scroll 0 0;
  border: medium none;
  border-radius: 50%;
  color: #fff;
  cursor: pointer;
  font-size: 17px;
  height: 33px;
  position: absolute;
  right: 0;
  top: 11px;
  width: 33px;
}
.messaging { padding: 0 0 50px 0;}

.msg_history {
  height: 516px;
  overflow-y: auto;
}

.no_msg{
  font-size: 15px;
  color: #4c4c4c;
  text-align: center;
  margin-top: 220px;
}

</style>