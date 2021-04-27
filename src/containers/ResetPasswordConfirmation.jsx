import React from "react";
//styles
import form from "../styles/Form.module.css";

const ResetPasswordConfirmation = () => {
  return (
    <>
    <div>
      <div className={form.title}>Password Reset Email Sent</div>
      <div className={form.container}>
        <img className={form.icon} src="/email.png" alt="Email Sent" />
        <div className={form.message}>
          We have just sent you a link to reset your password.
        </div>
      </div>
      </div>
    </>
  );
};

export default ResetPasswordConfirmation;
