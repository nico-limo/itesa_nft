import React from "react"
import { Link } from "react-router-dom"
//CSS
import styles from "../styles/NavBar.module.css"
//Recoil
import { useRecoilState } from "recoil"
import { userAtom } from "../state/atoms"

import { AuthFunctions } from "../utils/firebase/authEmail";

const NavBar = () => {
  const [user, setuser] = useRecoilState(userAtom)
  const { logOut } = AuthFunctions();

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
            <div onClick={(event) => logOut(event)}>Sign Out</div>
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
  )
}

export default NavBar
