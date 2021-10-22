import { initializeApp } from 'firebase/app';

// const firebaseConfig = {
//     apiKey: "AIzaSyCX9B0_VqAUpfpW7zLJ1q96i7JhTdTqHcI",
//     authDomain: "glowing-robo-health.firebaseapp.com",
//     projectId: "glowing-robo-health",
//     storageBucket: "glowing-robo-health.appspot.com",
//     messagingSenderId: "783533885863",
//     appId: "1:783533885863:web:501af1115d61c511b10e82"
// };

const firebaseConfig = {
    apiKey: "AIzaSyDECGXsSCE9ZsBoEBn2LgLUPgVtUSo2OVU",
    authDomain: "alvintestcpp.firebaseapp.com",
    projectId: "alvintestcpp",
    storageBucket: "alvintestcpp.appspot.com",
    messagingSenderId: "407777215865",
    appId: "1:407777215865:web:8270985104bd87256d5ba8",
    measurementId: "G-GY8NXJF1TC"
}

const firebaseApp = initializeApp(firebaseConfig);

export default firebaseApp;