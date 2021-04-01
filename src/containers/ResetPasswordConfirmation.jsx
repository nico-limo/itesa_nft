import React, { useState, useEffect } from "react"
//styles
import form from "../styles/Form.module.css"

const ResetPasswordConfirmation = () => {
  return (
    <>
      <div className={form.title}>Password Reset Email Sent</div>
      <div className={form.container}>
        <div className={form.instructions}>
          We have just sent you a link to reset your password.
        </div>
      </div>
    </>
  )
}

export default ResetPasswordConfirmation
