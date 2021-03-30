import React from "react"
import { Link } from "react-router-dom"
//styles
import form from "../styles/Form.module.css"
//utils
import { useInput } from "../utils/hooks/useInput"
import { UserFunctions } from "../utils/firebase/authEmail"

const Login = () => {
  const email = useInput("email")
  const password = useInput("password")
  const { login } = UserFunctions()

  return (
    <>
      <div className={form.title}>Log In</div>
      <div className={form.container}>
        <div>
          <form className={form.form}>
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
              onClick={(event) => login(event, email.value, password.value)}
            >
              Sign In
            </button>
          </form>
          <div>
            <span>
              <Link className={form.link} to="/register">
                Sign Up
              </Link>
            </span>
            <span className={form.forgotPassword}>Forgot password?</span>
          </div>
        </div>
      </div>
    </>
  )
}

export default Login
