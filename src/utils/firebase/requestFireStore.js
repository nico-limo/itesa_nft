import { db } from "../../firebaseConfig";

// Collections
// const artWorkRef = db.collection('artWork');
const usersReference = db.collection('Users');

export const newUser = async (user, username) => {
  await usersReference.add({
        email: user.user.email,
        username: username,
        uid: user.user.uid
    })
}