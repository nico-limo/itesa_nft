import firebase from "firebase";

const firebaseConfig = {
    apiKey: "AIzaSyD7lRYJSMQKTuFvAD_fKAxUJG7PLWFQ6gg",
    authDomain: "itesa-nft.firebaseapp.com",
    databaseURL: "https://itesa-nft-default-rtdb.firebaseio.com",
    projectId: "itesa-nft",
    storageBucket: "itesa-nft.appspot.com",
    messagingSenderId: "394556570407",
    appId: "1:394556570407:web:c9858f8d80f006efe7c702"
  };

  const firebaseApp = firebase.initializeApp(firebaseConfig);
  //const db = firebaseApp.firestore();
  const auth = firebase.auth();

  export { auth };