import firebase from "firebase/app";
import "firebase/firebase-firestore";
import "firebase/firebase-auth";
import "firebase/firebase-storage";

const firebaseConfig = {
  apiKey: "AIzaSyD7lRYJSMQKTuFvAD_fKAxUJG7PLWFQ6gg",
  authDomain: "itesa-nft.firebaseapp.com",
  databaseURL: "https://itesa-nft-default-rtdb.firebaseio.com",
  projectId: "itesa-nft",
  storageBucket: "gs://itesa-nft.appspot.com/",
  messagingSenderId: "394556570407",
  appId: "1:394556570407:web:c9858f8d80f006efe7c702",
};

const firebaseApp = firebase.initializeApp(firebaseConfig); // Inicializas firebase de la cloud a tu proyecto
const db = firebaseApp.firestore();
const auth = firebase.auth();
const storage = firebase.storage();
export { auth, db, storage };
