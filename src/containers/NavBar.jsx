import React, { useState } from "react";
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
  const local = JSON.parse(localStorage.getItem("logged"));
  const toggleDropdown = () => setShowDropdown(!showDropdown);
  return (
    <div className={styles.navbarContainer}>
      <Link className={styles.navbarLink} to="/">
        <div>Home</div>
      </Link>
      <Link className={styles.navbarLink} to="/creators">
        <div>Creators</div>
      </Link>
      {local?.uid || user?.uid ? (
        <>
          <Link className={styles.navbarLink} to="/artwork/create">
            <div>Create</div>
          </Link>
          <img
            onClick={() => toggleDropdown()}
            className={styles.profilePicture}
            src={local?.photo_profile}
            alt={user.username}
          />
        </>
      ) : (
        <>
          <Link className={styles.navbarLink} to="/login">
            <div>Login</div>
          </Link>
          <Link
            className={`${styles.navbarLink} ${styles.lastButton}`}
            to="/register"
          >
            <div>Sign Up</div>
          </Link>
        </>
      )}
      <div
        className={`${styles.dropdown} ${showDropdown ? null : styles.hidden}`}
      >
        <Link className={styles.navbarLink} to="/me">
          <div
            onClick={() => toggleDropdown()}
            className={styles.dropdownOptions}
          >
            View Profile
          </div>
        </Link>
        <Link className={styles.navbarLink} to="/me/edit">
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
