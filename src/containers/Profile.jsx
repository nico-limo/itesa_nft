import React from "react";
//Recoil
import { UserFunctions } from "../utils/firebase/authEmail";
//styles
import form from "../styles/Form.module.css";
const Profile = () => {
  const { logOut } = UserFunctions();

  return (
    <div className={form.form}>
      <button onClick={(event) => logOut(event)}>Sign Out</button>
    </div>
  );
};

export default Profile;
