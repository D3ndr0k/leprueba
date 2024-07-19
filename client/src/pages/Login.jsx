import { useForm } from "react-hook-form";
import MainHeader from "../components/MainHeader";
import "./Login.css";
import { useState } from "react";
import { useAuth } from "../context/AuthContext";

function Login() {
  const [errores, setErrores] = useState();
  const { register, handleSubmit } = useForm();
  const { login } = useAuth();

  const submit = async (values) => {
    try {
      await login(values);
    } catch (error) {
      setErrores("Error al iniciar sesión");
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
            id="email"
            placeholder="Email"
            {...register("email", { required: true })}
          />
          <input
            type="password"
            name="password"
            id="password"
            placeholder="Password"
            autoComplete="on"
            {...register("password", { required: true })}
          />
          {errores && <div className="error">{errores}</div>}
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
