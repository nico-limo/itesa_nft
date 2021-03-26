import React from "react";
import { Link } from "react-router-dom";
//styles
import form from "../styles/Form.module.css";
//hooks
import { useInput } from "../hooks/useInput";

const Register = () => {
  const username = useInput("username");
  const email = useInput("email");
  const password = useInput("password");
  return (
    <div className={form.container}>
      <h2 className={form.title}>SIGN UP</h2>
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
          <button>Create an Account</button>
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
  );
};

export default Register;
