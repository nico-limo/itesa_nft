import React from "react"
//Recoil
import { UserFunctions } from "../utils/firebase/authEmail";
//styles
import form from "../styles/Form.module.css";
const Profile = () => {
    const {login, logOut} =  UserFunctions();

    return (
        <button onClick={(event) => logOut(event)}>Sign Out</button>
    )
}
   


export default Profile