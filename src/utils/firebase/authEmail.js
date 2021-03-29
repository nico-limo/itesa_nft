//Firebase Auth
import { auth } from "../../firebaseConfig";
import { newUser } from "./requestFireStore";
//Recoil
import { useRecoilState } from "recoil";
import { userAtom } from "../../state/atoms";

export const UserFunctions = () => {
  const [user, setUser] = useRecoilState(userAtom);

  const login = (event, email, password) => {
    event.preventDefault();
    auth
      .signInWithEmailAndPassword(email, password)
      .then((userAuth) => {
        setUser({
          uid: userAuth.user.uid,
          email: userAuth.user.uid,
        });
        console.log("User Sign In", userAuth.user.uid);
      })
      .catch((e) => console.log(e.message));
  };

  const register = (event, email, password, username) => {
    event.preventDefault();
    auth
      .createUserWithEmailAndPassword(email, password)
      .then((user) => {})
      .catch((e) => console.log(e.message));
  };

  const isUser = () => {
    auth.onAuthStateChanged((userAuth) => {
      if (userAuth) {
        setUser({
          uid: userAuth.uid,
          email: userAuth.uid,
        });
      } else {
        console.log("No existe usuario");
      }
    });
  };

  const logOut = (event) => {
    event.preventDefault();
    auth.signOut();
  };

  return { login,register,isUser,logOut };
};
