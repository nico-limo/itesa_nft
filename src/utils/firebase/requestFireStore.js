import { db } from "../../firebaseConfig";

// Collections
//const artWorkRef = db.collection('artWork');
const usersReference = db.collection('Users').doc()


//---------------- USER FUNCTIONS------------------------
export const newUser = async (user, username) => {
  await usersReference.set({
        email: user.user.email,
        username: username,
        uid: user.user.uid,
        created: new Date()
    })
}

export const updateUser = async () => {
  const res = await usersReference.update
}


//---------------- USER FUNCTIONS------------------------

//---------------- PRODUCT FUNCTIONS------------------------




//---------------- PRODUCT FUNCTIONS------------------------