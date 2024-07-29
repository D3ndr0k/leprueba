import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import MainHeader from "../components/MainHeader";
import "./Login.css";
import { api } from "../api/api";

function UpPass() {
  const navigate = useNavigate();
  const { register, handleSubmit, watch } = useForm();
  const [errors, setErrors] = useState(null);
  const { id, token } = useParams(); // Llamar a useParams() como función

  // Para verificar que las contraseñas coincidan
  const password = watch("password");

  const submit = async (values) => {
    if (values.password !== values.password2) {
      setErrors("Passwords do not match");
      return;
    }

    try {
      const resp = await api.post(`/resetpass/${id}/${token}`, {
        password: values.password,
      });
      if (resp.data.ok) {
        setErrors(null);
        navigate("/login");
      } else if (resp.data.error) {
        setErrors(resp.data.error);
      }
    } catch (error) {
      setErrors("Error, try again.");
    }
  };

  return (
    <>
      <MainHeader />
      <div className="conten">
        <form className="login" onSubmit={handleSubmit(submit)}>
          <p> Change Password</p>
          <span className="hr"></span>

          <input
            type="password"
            name="password"
            placeholder="Password"
            autoComplete="new-password"
            {...register("password", { required: "Password is required" })}
          />

          <input
            type="password"
            name="password2"
            placeholder="Confirm Password"
            autoComplete="new-password"
            {...register("password2", {
              required: "Please confirm your password",
            })}
          />

          {errors && <div className="error">{errors}</div>}

          <button type="submit" className="btn" id="login">
            Update
          </button>
        </form>
      </div>
    </>
  );
}

export default UpPass;
