import { useForm } from "react-hook-form";
import MainHeadre from "../components/MainHeader";
import "./Login.css";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { api } from "../api/api";

function Login() {
  const navigate = useNavigate();
  const [errores, setErrores] = useState();
  const { register, handleSubmit } = useForm();
  const submit = async (values) => {
    const resp = await api.post("/login", values);
    setErrores(resp.data.error);
    if (resp.data.ok === "ok") {
      navigate("/home");
    }
  };
  return (
    <>
      <MainHeadre />
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
          <div className="error">{errores}</div>
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
