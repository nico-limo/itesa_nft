import { db } from "../../../firebaseConfig";
// Collections
//const artWorkRef = db.collection('artWork');
const usersReference = db.collection('Users')
//---------------- USER FUNCTIONS------------------------
export const newUser = async (user, username) => {
  await usersReference.doc().set({
    email: user.user.email,
    username: username,
    uid: user.user.uid,
    created: new Date()
  })
}
export const updateUser = async (email, username) => {
  await usersReference.update({
    email,
    username,
  })
}
export const getUser = async (id) => {
  const snapshot = await usersReference.where('uid', '==', id).get();
  if (snapshot.empty) {
    console.log('user not found in db')
    return;
  }
  let user = '';
  snapshot.forEach(doc => {
    user = doc.data()
  });
  return user;
}
