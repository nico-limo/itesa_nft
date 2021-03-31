import { db } from "../../../firebaseConfig";
//Recoil
import {userAtom} from "../../../state/atoms";
import { useRecoilValue } from "recoil";

export const UserFunctions = () => {
  const user = useRecoilValue(userAtom);
  const artWorkRef = db.collection('artWork');
  const usersReference = db.collection("Users");


  const newUser = async (user, username) => {
    await usersReference.doc().set({
      email: user.user.email,
      username: username,
      description: null,
      photo_profile:
        "https://firebasestorage.googleapis.com/v0/b/itesa-nft.appspot.com/o/profile.png?alt=media&token=af72068f-1386-4f6f-96be-4dd99d2e9870",
      main_picture: null,
      uid: user.user.uid,
      created: new Date(),
    });
  };
  const updateUser = async (e, description, photo_profile, main_picture) => {
    e.preventDefault();
    const snapshot = await usersReference.where("uid", "==", user.uid).get();
    snapshot.forEach((doc) => {
        doc.ref.update({
          description,photo_profile,main_picture
      });
    });
    const snapshot2 = await artWorkRef.where("authorId", "==", user.uid).get();
    snapshot2.forEach((doc) => {
      doc.ref.update({
        description,photo_profile
     });
    });
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

  return {newUser, getUser, updateUser, getAllUsers};

};
