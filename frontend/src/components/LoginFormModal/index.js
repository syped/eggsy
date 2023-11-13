// frontend/src/components/LoginFormModal/index.js
import React, { useState } from "react";
import * as sessionActions from "../../store/session";
import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import "./LoginForm.css";

function LoginFormModal() {
  const dispatch = useDispatch();
  const [credential, setCredential] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});
  const { closeModal } = useModal();

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrors({});
    return dispatch(sessionActions.login({ credential, password }))
      .then(closeModal)
      .catch(async (res) => {
        const data = await res.json();
        if (data && data.errors) {
          setErrors(data.errors);
        }
      });
  };

  const handleDemoUser = (e) => {
    setCredential("Demo-lition");
    setPassword("password");
  };

  return (
    <>
      <div className="log-in-modal"></div>
      <h1>Log In</h1>
      <form noValidate onSubmit={handleSubmit}>
        <div className="log-in-form">
          <label>
            Username or Email
            <input
              type="text"
              value={credential}
              onChange={(e) => setCredential(e.target.value)}
              required
            />
          </label>
          {errors.credential && <p className="error">{errors.credential}</p>}
          <label>
            Password
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </label>
          {errors.password && <p className="error">{errors.password}</p>}
          <button className="log-button" type="submit">
            Log In
          </button>
          <button
            className="demo-button"
            onClick={handleDemoUser}
            type="submit"
          >
            Demo User
          </button>
        </div>
      </form>
    </>
  );
}

export default LoginFormModal;
