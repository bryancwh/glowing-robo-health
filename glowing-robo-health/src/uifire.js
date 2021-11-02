import firebase from 'firebase/compat/app'

const firebaseConfig = {
    apiKey: "AIzaSyCX9B0_VqAUpfpW7zLJ1q96i7JhTdTqHcI",
    authDomain: "glowing-robo-health.firebaseapp.com",
    projectId: "glowing-robo-health",
    storageBucket: "glowing-robo-health.appspot.com",
    messagingSenderId: "783533885863",
    appId: "1:783533885863:web:501af1115d61c511b10e82"
};

firebase.initializeApp(firebaseConfig);

export default firebase;