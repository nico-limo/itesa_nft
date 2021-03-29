import React from "react";
import { Link } from "react-router-dom";
//CSS
import styles from "../styles/NavBar.module.css";
//Recoil
import { useRecoilState } from "recoil";
import { userAtom } from "../state/atoms";

const NavBar = () => {
  const [user, setuser] = useRecoilState(userAtom);
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
          <Link to="/me">
            <div>Profile</div>
          </Link>
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
    </div>
  );
};

export default NavBar;
