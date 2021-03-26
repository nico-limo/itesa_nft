import React, { useState } from "react"
import { Link } from "react-router-dom"

const NavBar = () => {
  const [user, setUser] = useState(false)
  return(
    <>
      <Link to="/">
        <div>Home</div>
      </Link>
      <Link to="/creators">
        <div>Creators</div>
      </Link>
      {user ? (
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
    </>
  )
}

export default NavBar
