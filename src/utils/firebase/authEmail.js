//Firebase Auth
import { auth } from "../../firebaseConfig"
//FireStore
import { UserFunctions } from "../firebase/requests/userRequests"
//Recoil
import { useSetRecoilState } from "recoil"
import { userAtom, formErrorAtom } from "../../state/atoms"
// React Router Dom
import { useHistory } from "react-router-dom"
export const AuthFunctions = () => {
  const setUser = useSetRecoilState(userAtom)
  const setFormError = useSetRecoilState(formErrorAtom)
  const { getUser, newUser } = UserFunctions()
  const history = useHistory()

  const login = (event, email, password) => {
    event.preventDefault()
    auth
      .signInWithEmailAndPassword(email, password)
      .then((userAuth) => {
        getUser(userAuth.user.uid)
          .then((res) => {
            setUser({
              email: res.email,
              uid: res.uid,
              username: res.username,
              photo_profile: res.photo_profile,
              main_picture: res.main_picture,
            })
          })
          .then(() => history.push("/"))
      })
      .catch((e) => setFormError(e.message))
  }

  const register = (event, email, password, username) => {
    event.preventDefault()
    auth
      .createUserWithEmailAndPassword(email, password)
      .then((userAuth) => {
        newUser(userAuth, username)
      })
      .then(() => history.push("/me/edit"))
      .catch((e) => setFormError(e.message))
  }

  const isUser = () => {
    auth.onAuthStateChanged((userAuth) => {
      if (userAuth) {
        getUser(userAuth.uid).then((res) =>
          setUser({
            email: res.email,
            uid: res.uid,
            username: res.username,
            photo_profile: res.photo_profile,
            main_picture: res.main_picture,
          })
        )
      } else {
        console.log("no user logged in")
      }
    })
  }

  const logOut = () => {
    auth.signOut()
    setUser({})
    history.push("/")
  }

  return { login, register, isUser, logOut }
}
