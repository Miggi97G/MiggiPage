import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";

// Firebase Konfiguration
const firebaseConfig = {
    apiKey: "AIzaSyD0cpQj_PDtuCqoLU71tiSRynJxnzXiByY",
    authDomain: "miggipage.firebaseapp.com",
    databaseURL: "https://miggipage-default-rtdb.europe-west1.firebasedatabase.app",
    projectId: "miggipage",
    storageBucket: "miggipage.firebasestorage.app",
    messagingSenderId: "156247260817",
    appId: "1:156247260817:web:c3cdb4d25449581d7fc930",
    measurementId: "G-DQZZXEFYYW"
};

// Initialisiere Firebase
const app = initializeApp(firebaseConfig);

export { app };
