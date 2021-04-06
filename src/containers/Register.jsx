import React, { useEffect, useState } from "react"
import { Link } from "react-router-dom"
//styles
import form from "../styles/Form.module.css"
//utils
import { useInput } from "../utils/hooks/useInput"
import { AuthFunctions } from "../utils/firebase/auth/authEmail"
//Recoil
import { useRecoilState } from "recoil"
import { formErrorAtom } from "../state/atoms"

import FormButtonSpinner from "../components/FormButtonSpinner"

const Register = () => {
  const username = useInput("username")
  const email = useInput("email")
  const password = useInput("password")
  const { register } = AuthFunctions()
  const [formError, setFormError] = useRecoilState(formErrorAtom)
  const [showLoadingSpinner, setShowLoadingSpinner] = useState(false)

  useEffect(() => setFormError(""), [])

  useEffect(() => {
    if (formError) setShowLoadingSpinner(false);
  }, [formError]);

  return (
    <>
      <div className={form.title}>Sign Up</div>
      <div className={form.container}>
        <form
          onSubmit={(event) => {
            setShowLoadingSpinner(true)
            register(event, email.value, password.value, username.value)
          }}
          className={form.form}
        >
          <input
            className={form.input}
            placeholder="Enter a username"
            type="text"
            name={username.name}
            value={username.value}
            onChange={username.onChange}
          />
          <input
            className={form.input}
            placeholder="Enter your email"
            type="email"
            name={email.name}
            value={email.value}
            onChange={email.onChange}
          />
          <input
            className={form.input}
            placeholder="Set a new password"
            type="password"
            name={password.name}
            value={password.value}
            onChange={password.onChange}
          />
          <button type="submit">
            {showLoadingSpinner ? (
              <FormButtonSpinner />
            ) : (
              <div>Create an Account</div>
            )}
          </button>
        </form>
        {formError && <div className={form.error}>{formError}</div>}
        <div className={form.forgotAndSignUpContainer}>
          <div>
            <Link className={form.link} to="/login">
              Already have an account? Sign In
            </Link>
          </div>
        </div>
      </div>
    </>
  )
}

export default Register
