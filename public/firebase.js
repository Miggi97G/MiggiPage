// Importiere die benötigten Funktionen aus dem Firebase SDK
import { getFirestore, collection, addDoc, serverTimestamp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";
import { app } from "./firebase-config.js";

const db = getFirestore(app);