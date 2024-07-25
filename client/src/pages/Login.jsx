import { useForm } from "react-hook-form";
import MainHeader from "../components/MainHeader";
import "./Login.css";
import { useState } from "react";
import { useAuth } from "../context/AuthContext";

function Login() {
  const { register, handleSubmit } = useForm();
  const { login } = useAuth();
  const [errors, setErrors] = useState(null);

  const submit = async (values) => {
    try {
      await login(values.email, values.password);
    } catch (error) {
      console.error("Login failed:", error);
      setErrors("Login failed. Please check your credentials and try again.");
    }
  };

  return (
    <>
      <MainHeader />
      <div className="conten">
        <form className="login" onSubmit={handleSubmit(submit)}>
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
          {errors && <div className="error">{errors}</div>}
          <button type="submit" className="btn" id="login">
            Log In
          </button>
          <a href="logincode.html">Login with code</a>
          <a href="">Change password</a>
        </form>
      </div>
    </>
  );
}

export default Login;
