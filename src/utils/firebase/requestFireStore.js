import { db } from "../../firebaseConfig";

// Collections
//const artWorkRef = db.collection('artWork');



const usersReference = db.collection('Users').doc("user")

export const newUser = (user, username) => {
    usersReference.set({
        email: user.email,
        username: username,
    })
}