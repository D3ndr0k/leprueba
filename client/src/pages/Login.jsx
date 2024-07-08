import { useForm } from "react-hook-form";
import MainHeadre from "../components/MainHeader";
import "./Login.css";

function Login() {
  const { register, handleSubmit } = useForm();

  const submit = (data) => {
    console.log(data);
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
