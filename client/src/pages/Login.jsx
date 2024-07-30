import { useForm } from "react-hook-form";
import MainHeader from "../components/MainHeader";
import "./Login.css";
import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { Link } from "react-router-dom";
import Footer from "../components/Footer";

function Login() {
  const { register, handleSubmit } = useForm();
  const { login, Error } = useAuth();
  const [errors, setErrors] = useState(null);

  const submit = async (values) => {
    try {
      await login(values.email, values.password);
    } catch (error) {
      setErrors("Login failed. Please check your credentials and try again.");
    }
  };

  return (
    <>
      <MainHeader />
      <div className="conten">
        <form className="login" onSubmit={handleSubmit(submit)}>
          <p>Log in</p>
          <span className="hr"></span>

          <input
            type="email"
            name="email"
            placeholder="Email"
            {...register("email", { required: true })}
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            autoComplete="on"
            {...register("password", { required: true })}
          />
          <div className="error">{errors}</div>
          <div className="error">{Error}</div>
          <button type="submit" className="btn" id="login">
            Log In
          </button>
          {/* <a href="">Login with code</a> */}
          <Link to="/forgot-password">Change password</Link>
        </form>
      </div>
      <Footer />
    </>
  );
}

export default Login;
