import { db } from "../../../firebaseConfig";
//Recoil
import { userAtom } from "../../../state/atoms";
import { useRecoilState } from "recoil";



export const UserFunctions = () => {
  const [user, setUser] = useRecoilState(userAtom);

  const artWorkRef = db.collection('artWork');
  const usersReference = db.collection("Users");



  const newUser = async (user, username) => {
    await usersReference.doc().set({
      email: user.user.email,
      username: username,
      description: null,
      photo_profile:
        "",
      main_picture: null,
      uid: user.user.uid,
      created: new Date(),
    });
  };
  const updateUser = async (data) => {
    let key = Object.keys(data)[0];
    let value = Object.values(data)[0];
    const snapshot = await usersReference.where("uid", "==", user.uid).get();
    snapshot.forEach((doc) => {
        doc.ref.update({
          [key]: value,
      });
      if (key === "photo_profile" || key === "description") {
        getUser(user.uid).then((user) => setUser(user))
      }
      
    });
    const snapshot2 = await artWorkRef.where("authorId", "==", user.uid).get();
    if(key === 'photo_profile') {
      snapshot2.forEach((doc) => {
        doc.ref.update({
          [key]: value,
       });
      });
    } 
  };
  const getUser = async (id) => {
    const snapshot = await usersReference.where("uid", "==", id).get();
    if (snapshot.empty) {
      console.log("user not found in db");
      return;
    }
    let user = "";
    snapshot.forEach((doc) => {
      user = doc.data();
    });
    return user;
  };

  const getAllUsers = async () => {
    const snapshot = await usersReference.get();
    if (snapshot.empty) {
      console.log("The is no users in db");
      return;
    }
    let users = [];
    snapshot.forEach((doc) => {
      users = [...users, doc.data()];
    });
    return users;
  };

  const getUserCreations = async (id) => {
    const snapshot = await artWorkRef.where("authorId", "==", id).get();

    if (snapshot.empty) {
      console.log("The is no Creation in db for this user");
      return;
    }
    let userCreation = []
    snapshot.forEach((doc) => {
      userCreation = [...userCreation, doc.data()]
    });
    return userCreation;
  };
  const getUserCollections = async (id) => {
    const snapshot = await artWorkRef.where("ownerId", "==", id).get();

    if (snapshot.empty) {
      console.log("The is no Collection in db for this user");
      return;
    }
    let userCollection = []
    snapshot.forEach((doc) => {
      userCollection = [...userCollection, doc.data()]
    });
    return userCollection;
  };


  return { newUser, getUser, updateUser, getAllUsers, getUserCreations, getUserCollections };

};
