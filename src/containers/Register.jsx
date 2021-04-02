import React, { useEffect } from "react";
import { Link } from "react-router-dom";
//styles
import form from "../styles/Form.module.css";
//utils
import { useInput } from "../utils/hooks/useInput";
import { AuthFunctions } from "../utils/firebase/auth/authEmail";
//Recoil
import { useRecoilState } from "recoil";
import { formErrorAtom } from "../state/atoms";

const Register = () => {
  const username = useInput("username");
  const email = useInput("email");
  const password = useInput("password");
  const { register } = AuthFunctions();
  const [formError, setFormError] = useRecoilState(formErrorAtom);

  useEffect(() => setFormError(""), []);

  return (
    <>
      <div className={form.title}>Sign Up</div>
      <div className={form.container}>
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
  );
};

export default Register;
