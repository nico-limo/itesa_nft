//Firebase Auth
import { auth } from "../../firebaseConfig";
//FireStore
import { UserFunctions } from '../firebase/requests/userRequests';
//Recoil
import { useSetRecoilState } from "recoil";
import { userAtom } from "../../state/atoms";
// React Router Dom
import { useHistory } from "react-router-dom"
export const AuthFunctions = () => {
  const setUser = useSetRecoilState(userAtom);
  const {getUser, newUser  } = UserFunctions();
  const history = useHistory();

  const login = (event, email, password) => {
    event.preventDefault();
    auth
      .signInWithEmailAndPassword(email, password)
      .then((userAuth) => {
        getUser(userAuth.user.uid)
          .then(res => setUser({ email: res.email, uid: res.uid, username: res.username, photo_profile: res.photo_profile }))
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
          .then(res => setUser({ email: res.email, uid: res.uid, username: res.username, photo_profile: res.photo_profile }))
      } else {
        console.log("no user logged in");
      }
    });
  };

  const logOut = () => {
    auth.signOut();
    setUser({});
    history.push("/")
  };

  return { login, register, isUser, logOut };
};
