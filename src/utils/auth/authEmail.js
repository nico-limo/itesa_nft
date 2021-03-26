//Firebase Auth
import { auth } from "../../firebaseConfig";

export const register = (event,email,password) => {
    event.preventDefault();
    auth.createUserWithEmailAndPassword(email,password)
    .then(user => {
        console.log("User Sign Up");
    })
    .catch(e => console.log(e.message))
    
}


export const login = (event,email,password) => {
    event.preventDefault();
    auth.signInWithEmailAndPassword(email,password)
    .then(user => {
        console.log("User Sign In");
    })
    .catch(e => console.log(e.message))
};


export const isUser = () => {
    auth.onAuthStateChanged( userAuth =>  {
        if (userAuth) {
          console.log(userAuth);
        } else {
          console.log("No existe usuario");
        }    
      });
}

export const logOut = (event) => {
    event.preventDefault();
    auth.signOut();
}