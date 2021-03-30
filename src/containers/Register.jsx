import React from "react"
import { Link } from "react-router-dom"
//styles
import form from "../styles/Form.module.css"
//utils
import { useInput } from "../utils/hooks/useInput"
import { UserFunctions } from "../utils/firebase/authEmail"

const Register = () => {
  const username = useInput("username")
  const email = useInput("email")
  const password = useInput("password")
  const { register } = UserFunctions()

  return (
    <>
      <div className={form.title}>Sign Up</div>
      <div className={form.container}>
        <div>
          <form className={form.form}>
            <input
              className={form.input}
              placeholder="Enter a username"
              type="text"
              {...username}
            />
            <input
              className={form.input}
              placeholder="Enter your email"
              type="email"
              {...email}
            />
            <input
              className={form.input}
              placeholder="Set a new password"
              type="password"
              {...password}
            />
            <button
              onClick={(event) =>
                register(event, email.value, password.value, username.value)
              }
            >
              Create an Account
            </button>
          </form>
          <div>
            <span>
              <Link className={form.link} to="/login">
                Already have an account? Sign In
              </Link>
            </span>
          </div>
        </div>
      </div>
    </>
  )
}

export default Register
