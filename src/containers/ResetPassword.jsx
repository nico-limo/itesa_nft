import React, { useState, useEffect } from "react"
import { Link } from "react-router-dom"
//styles
import form from "../styles/Form.module.css"
//utils
import { useInput } from "../utils/hooks/useInput"
import { AuthFunctions } from "../utils/firebase/authEmail"

import { formErrorAtom } from "../state/atoms"

import FormButtonSpinner from "./FormButtonSpinner"

import { useRecoilState } from "recoil"

const ResetPassword = () => {
  const email = useInput("email")
  const { forgotPassword } = AuthFunctions()
  const [formError, setFormError] = useRecoilState(formErrorAtom)
  const [showLoadingSpinner, setShowLoadingSpinner] = useState(false)

  useEffect(() => setFormError(""), [])

  useEffect(() => {
    if (formError) setShowLoadingSpinner(false)
  }, [formError])

  return (
    <>
      <div className={form.title}>Trouble Logging In?</div>
      <div className={form.container}>
          <div className={form.instructions}>Enter your email and we'll send you a link to reset your password and get back into your account.</div>
        <form className={form.form}>
          <input
            className={form.input}
            placeholder="Enter your email"
            type="email"
            {...email}
          />
          <button
            onClick={(event) => {
              event.preventDefault()
              setShowLoadingSpinner(true)
              forgotPassword(event, email.value)
            }}
          >
            {showLoadingSpinner ? (
              <FormButtonSpinner />
            ) : (
              <div className={form.buttonText}>Send Password Reset Link</div>
            )}
          </button>
        </form>
        {formError && <div className={form.error}>{formError}</div>}
      </div>
    </>
  )
}

export default ResetPassword
