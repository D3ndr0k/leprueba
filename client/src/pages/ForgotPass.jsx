import { useForm } from "react-hook-form";
import MainHeader from "../components/MainHeader";
import "./Login.css";
import { useState } from "react";
import { api } from "../api/api";
import { useNavigate } from "react-router-dom";

function ForgotPass() {
  const navigate = useNavigate();
  const { register, handleSubmit } = useForm();
  const [errors, setErrors] = useState(null);
  const [loading, setLoading] = useState(false);

  const submit = async (values) => {
    setLoading(true);
    try {
      const resp = await api.post("/restablecerpass", values);
      if (resp.data.ok) {
        setErrors(null);
        navigate("/login");
      } else if (resp.data.error) {
        setErrors(resp.data.error);
      }
    } catch (error) {
      setErrors("Error, please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <MainHeader />
      <div className="conten">
        <form className="login" onSubmit={handleSubmit(submit)}>
          <p>Did you forget your password?</p>
          <span className="hr"></span>

          <input
            type="email"
            name="email"
            placeholder="Email"
            {...register("email", { required: true })}
          />
          {errors && <div className="error">{errors}</div>}
          <button type="submit" className="btn" id="login" disabled={loading}>
            {loading ? "Processing..." : "Recover password"}
          </button>
        </form>
      </div>
    </>
  );
}

export default ForgotPass;
