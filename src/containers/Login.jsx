import React from "react";
import { Link } from "react-router-dom";
//styles
import form from "../styles/Form.module.css";
//utils
import { useInput } from "../utils/hooks/useInput";
import { login, logOut } from "../utils/auth/authEmail";
const Login = () => {
  const email = useInput("email");
  const password = useInput("password");

  
  return (
    <div className={form.container}>
      <h2 className={form.title}>SIGN IN</h2>
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
          <button onClick={(event) => login(event,email.value,password.value)}>Sign In</button>
          <button onClick={(event) => logOut(event)}>Sign Out</button>
        </form>
        <div>
          <span>
            <Link className={form.link} to="/register">
              Sign Up
            </Link>
          </span>
          <span>Forgot password?</span>
        </div>
      </div>
    </div>
  );
};

export default Login;
