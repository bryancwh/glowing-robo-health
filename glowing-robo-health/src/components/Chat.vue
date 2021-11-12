<template>
    <div>
        <div class="message-body mt-3">
            <h3>Chat</h3>
            <h5>Welcome {{ name }}!</h5>
            <div class="card">
                <div class="card-body">
                <div
                    class="border pl-2 pt-1 ml-2 message-text mb-2"
                    v-for="message in messages"
                    :key="message"
                >
                    <span class="mg-text">{{ message.username }}</span>
                    <p class="message pt-1">{{ message.text }}</p>
                </div>
                </div>
            </div>
            <input v-model="showMessage" type="text" class="mt-3 mr-2 pl-2 pr-2" />
            <button class="btn btn-primary" @click="sendMessage">Send</button>
        </div>
    </div>
</template>
<script>
import firebaseApp from "../firebase.js";
import { getFirestore } from "firebase/firestore";
import {
  doc,
  collection,
  deleteDoc,
  getDocs,
  setDoc,
  query,
} from "firebase/firestore";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { StreamChat } from 'stream-chat';

const db = getFirestore(firebaseApp);  

export default {
}
</script>


