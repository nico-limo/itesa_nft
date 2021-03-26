import React from "react";
import { Link } from "react-router-dom";
import form from "../styles/Form.module.css";

const Login = () => {
  const email = useInput("email");
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
            name="password"
            placeholder="Set a new password"
            type="password"
          />
          <button>Sign In</button>
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
