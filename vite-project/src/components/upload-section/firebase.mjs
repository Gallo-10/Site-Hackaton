// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getStorage } from "firebase/storage";
import { query, doc, updateDoc, addDoc, collection, getFirestore, getDocs } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyCHutRoCqRqXH97dwmJB4rZKEqYZj4rWm4",
    authDomain: "hackaton-9be74.firebaseapp.com",
    projectId: "hackaton-9be74",
    storageBucket: "hackaton-9be74.appspot.com",
    messagingSenderId: "1086991427201",
    appId: "1:1086991427201:web:4f37a8d6bb8dfc60c9cf80",
    measurementId: "G-8MYB6540ME"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const storage = getStorage(app); // Initialize Firebase Storage
const db = getFirestore(app);


const getFeatured = async () => {
    const featuredCollection = collection(db, 'images');
    const featuredSnapshot = await getDocs(featuredCollection);
    const featuredList = featuredSnapshot.docs.map(doc => doc.data().toString());
    console.log(featuredList);
    return featuredList;

};

console.log(getFeatured());
export { storage, db };