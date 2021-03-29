import { db } from "../../firebaseConfig";

// Collections
const artWorkRef = db.collection('artWork');

export const addUser = async (user, username) => {
    const usersRef = await db.collection('Users');
   usersRef(user.uid).set(({
       email: user.email,
       username: username,
       wallet: null,
   }))
   console.log("User add it to the DB")
    
}

const usersReference = db.collection('Users').doc("user")

export const newUser = (user, username) => {
    usersReference.set({
        email: user.email,
        username: username,
    })
}