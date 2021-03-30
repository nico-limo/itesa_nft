//Firebase Auth
import { auth } from "../../firebaseConfig";
import { newUser } from "./requests/userRequests";
//FireStore
import { getUser } from '../firebase/requests/userRequests';
//Recoil
import { useRecoilState } from "recoil";
import { userAtom } from "../../state/atoms";

export const UserFunctions = () => {
  const [/*user*/, setUser] = useRecoilState(userAtom);

  const login = (event, email, password) => {
    event.preventDefault();
    auth
      .signInWithEmailAndPassword(email, password)
      .then((userAuth) => {
        getUser(userAuth.user.uid)
          .then(res => setUser({ email: res.email, uid: res.uid, username: res.username }))
      })
      .catch((e) => console.log(e.message));
  };

  const register = (event, email, password, username) => {
    event.preventDefault();
    auth
      .createUserWithEmailAndPassword(email, password)
      .then((userAuth) => {
        newUser(userAuth, username)
      })
      .catch((e) => console.log(e.message));
  };

  const isUser = () => {
    auth.onAuthStateChanged((userAuth) => {
      if (userAuth) {
        getUser(userAuth.uid)
          .then(res => setUser({ email: res.email, uid: res.uid, username: res.username }))
      } else {
        console.log("no user logged in");
      }
    });
  };

  const logOut = (event) => {
    event.preventDefault();
    auth.signOut();
  };

  return { login, register, isUser, logOut };
};
