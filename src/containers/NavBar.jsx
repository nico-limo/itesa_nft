import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
//CSS
import styles from "../styles/NavBar.module.css";
//Recoil
import { useRecoilValue } from "recoil";
import { userAtom } from "../state/atoms";
//Utils
import { AuthFunctions } from "../utils/firebase/auth/authEmail";

const NavBar = () => {
  const user = useRecoilValue(userAtom);
  const [showDropdown, setShowDropdown] = useState(false);
  const { logOut } = AuthFunctions();


  const toggleDropdown = () => setShowDropdown(!showDropdown);

  return (
    <div className={styles.navbarContainer}>
      <Link to="/">
        <div>Home</div>
      </Link>
      <Link to="/creators">
        <div>Creators</div>
      </Link>
      {user?.uid ? (
        <>
          <Link to="/artwork/create">
            <div>Create</div>
          </Link>
          <img
            onClick={() => toggleDropdown()}
            className={styles.profilePicture}
            src={user.photo_profile}
            alt={user.username}
          />
        </>
      ) : (
        <>
          <Link to="/login">
            <div>Login</div>
          </Link>
          <Link to="/register">
            <div>Sign Up</div>
          </Link>
        </>
      )}
      <div
        className={
          showDropdown ? styles.visibleDropdown : styles.hiddenDropdown
        }
      >
        <Link to="/me">
          <div
            onClick={() => toggleDropdown()}
            className={styles.dropdownOptions}
          >
            View Profile
          </div>
        </Link>
        <Link to="/me/edit">
          <div
            onClick={() => toggleDropdown()}
            className={styles.dropdownOptions}
          >
            Edit Profile
          </div>
        </Link>
        <hr />
        <div
          className={styles.dropdownOptions}
          onClick={(event) => {
            toggleDropdown();
            logOut(event);
          }}
        >
          Sign Out
        </div>
      </div>
    </div>
  );
};

export default NavBar;
