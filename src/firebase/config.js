import * as firebase from 'firebase/app';
import 'firebase/storage';
import 'firebase/firestore';
import 'firebase/auth';
import 'firebase/database'

var firebaseConfig = {
    apiKey: "AIzaSyDFb3Nn7sX4rHycybeux2Y6bOgFVUTxCqU",
    authDomain: "imagebox-74a1f.firebaseapp.com",
    projectId: "imagebox-74a1f",
    storageBucket: "imagebox-74a1f.appspot.com",
    messagingSenderId: "617078938641",
    appId: "1:617078938641:web:efd51bdcf45661b41f25b0",
    measurementId: "G-ZZZEG35ZQN"
  };

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
//firebase.analytics();

const projectStorage = firebase.storage();
const projectFirestore = firebase.firestore();
const timestamp = firebase.firestore.FieldValue.serverTimestamp;
const database = firebase.database();

const auth = firebase.auth();

export { projectStorage, projectFirestore, timestamp, auth, database };