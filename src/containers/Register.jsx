import React from "react";
import { Link } from "react-router-dom";
import form from "../styles/Form.module.css";

const Register = () => (
  <div className={form.container}>
    <h2 className={form.title}>SIGN UP</h2>
    <div>
      <form className={form.form}>
        <input
          className={form.input}
          name="username"
          placeholder="Enter a username"
          type="text"
        />
        <input
          className={form.input}
          name="email"
          placeholder="Enter your email"
          type="email"
        />
        <input
          className={form.input}
          name="password"
          placeholder="Set a new password"
          type="password"
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

export default Register;
