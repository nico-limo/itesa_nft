import React, { useState, useEffect } from "react"
import { Link } from "react-router-dom"
//styles
import form from "../styles/Form.module.css";
//utils
import { useInput } from "../utils/hooks/useInput"
import { AuthFunctions } from "../utils/firebase/auth/authEmail"

import { formErrorAtom } from "../state/atoms"

import FormButtonSpinner from "./FormButtonSpinner"

import { useRecoilState } from "recoil"

const Login = () => {
  const email = useInput("email")
  const password = useInput("password")
  const { login } = AuthFunctions()
  const [formError, setFormError] = useRecoilState(formErrorAtom)
  const [showLoadingSpinner, setShowLoadingSpinner] = useState(false)

  useEffect(() => setFormError(""), [])

  useEffect(() => {
    if (formError) setShowLoadingSpinner(false)
  }, [formError])

  return (
    <>
      <div className={form.title}>Log in</div>
      <div className={form.container}>
        <form
          onSubmit={(event) => login(event, email.value, password.value)}
          className={form.form}
        >
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
            onClick={(event) => {
              event.preventDefault()
              setShowLoadingSpinner(true)
              login(event, email.value, password.value)
            }}
          >
            {showLoadingSpinner ? (
              <FormButtonSpinner />
            ) : (
              <div>Sign In</div>
            )}
          </button>
        </form>
        {formError && <div className={form.error}>{formError}</div>}
        <div className={form.forgotAndSignUpContainer}>
          <div>
            <Link className={form.link} to="/register">
              Don't have an account? Sign up
            </Link>
          </div>
          <div className={form.forgotPassword}>
            <Link className={form.link} to="/reset">
              Forgot password?
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
