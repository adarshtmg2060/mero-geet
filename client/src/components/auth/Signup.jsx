import "./Auth.scss";
import logo from "../../img/logo.gif";
import { Link, Navigate } from "react-router-dom";
import { signupUser } from "../../store/thunks/user";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { useState } from "react";
import isValidEmail from "./isValidEmail";
import Button from "../UI/Button";
import Input from "../UI/Input";

const Signup = () => {
  const { auth, loading } = useSelector((state) => state.user);
  console.log(loading);

  const dispatch = useDispatch();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");

  const handleSignup = (e) => {
    e.preventDefault();

    // Basic validation
    if (
      !name.trim() ||
      !email.trim() ||
      !password.trim() ||
      !passwordConfirm.trim()
    ) {
      return toast.warn("All fields are required");
    }
    if (password !== passwordConfirm) {
      return toast.warn("Passwords do not match");
    }
    if (!isValidEmail(email)) {
      return toast.warn("Email is not valid");
    }

    dispatch(signupUser({ name, email, password, passwordConfirm }));
  };

  if (auth) return <Navigate to="/" />;

  return (
    <div className="auth">
      <form className="auth__form" onSubmit={handleSignup}>
        <img className="auth__form-logo" src={logo} alt="mero geet logo" />

        <Link to="/login" className="auth__form-link">
          Log In here
        </Link>

        <Input
          name="name"
          placeholder="Name"
          required
          onChange={(e) => setName(e.target.value)}
        />
        <Input
          type="email"
          name="email"
          placeholder="Email"
          required
          onChange={(e) => setEmail(e.target.value)}
        />
        <Input
          type="password"
          name="password"
          placeholder="Password"
          required
          onChange={(e) => setPassword(e.target.value)}
        />
        <Input
          type="password"
          name="passwordConfirm"
          placeholder="Confirm Password"
          required
          onChange={(e) => setPasswordConfirm(e.target.value)}
        />

        <Button type="submit" disabled={loading}>
          {loading ? "Loading..." : "Sign Up"}
        </Button>
      </form>
    </div>
  );
};

export default Signup;
