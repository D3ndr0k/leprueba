import { useState } from "react";
import { useForm } from "react-hook-form";
import "./ApplyWholesaler.css";
import MainHeadre from "../components/MainHeader";
import { useNavigate } from "react-router-dom";
import { api } from "../api/api";

function ApplyWholesaler() {
  const navigate = useNavigate();
  const [errores, setErrores] = useState();
  const { register, handleSubmit } = useForm();

  const submit = async (values) => {
    const resp = await api.post("/apply", values);
    setErrores(resp.data.error);
    if (resp.data.ok === "ok") {
      navigate("/login");
    }
  };
  return (
    <>
      <MainHeadre />

      <div className="conten">
        <form className="apply" onSubmit={handleSubmit(submit)}>
          <input
            type="text"
            id="name"
            placeholder="Company name"
            {...register("name", { required: true })}
          />
          <input
            type="text"
            id="eori"
            placeholder="Eori number"
            {...register("eori", { required: true })}
          />
          <input
            type="password"
            id="password"
            placeholder="Password"
            autoComplete="on"
            {...register("password", { required: true })}
          />
          <input
            type="email"
            id="email"
            placeholder="Email"
            {...register("email", { required: true })}
          />
          <input
            type="text"
            id="address"
            placeholder="Company address"
            {...register("address", { required: true })}
          />
          <select
            className="country"
            id="country"
            {...register("country", { required: true })}
          >
            <option hidden>Country</option>
            <option value="1">1</option>
          </select>
          <textarea
            name="message"
            id="message"
            placeholder="Tell us about your Company to evaluate your application...."
          ></textarea>
          <div className="error">{errores}</div>
          <button type="submit" className="btn" id="btn">
            Apply
          </button>
        </form>
      </div>
    </>
  );
}

export default ApplyWholesaler;
