import { useState } from "react";
import { set, useForm } from "react-hook-form";
import "./ApplyWholesaler.css";
import MainHeadre from "../components/MainHeader";
import { useNavigate } from "react-router-dom";
import { api } from "../api/api";

function ApplyWholesaler() {
  const navigate = useNavigate();
  const [errores, setErrores] = useState();
  const { register, handleSubmit } = useForm();
  const [nameError, setNameError] = useState();
  const [emailError, setEmailError] = useState();
  const [passError, setPassError] = useState();
  const [addresError, setAddressError] = useState();
  const [countryError, setCountryError] = useState();

  const submit = async (values) => {
    const resp = await api.post("/apply", values);

    const namecheck = resp.data.name || "no error";
    if (namecheck === "no error") {
      setNameError();
    } else {
      setNameError(resp.data.name._errors[0]);
    }

    const emailcheck = resp.data.email || "no error";
    if (emailcheck === "no error") {
      setEmailError();
    } else {
      setEmailError(resp.data.email._errors[0]);
    }

    const passcheck = resp.data.password || "no error";
    if (passcheck === "no error") {
      setPassError();
    } else {
      setPassError(resp.data.password._errors[0]);
    }

    const addresscheck = resp.data.address || "no error";
    if (addresscheck === "no error") {
      setAddressError();
    } else {
      setAddressError(resp.data.address._errors[0]);
    }

    const countrycheck = resp.data.country || "no error";
    if (countrycheck === "no error") {
      setCountryError();
    } else {
      setCountryError(resp.data.country._errors[0]);
    }

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
          <div className="input1">
            <input
              type="email"
              id="email"
              placeholder="Email"
              {...register("email", { message: "hola" })}
            />
            <div className="errors">{emailError}</div>
            <input
              type="password"
              id="password"
              placeholder="Password"
              autoComplete="on"
              {...register("password")}
            />
            <div className="errors">{passError}</div>
            <input
              type="text"
              id="name"
              placeholder="Company name"
              {...register("name")}
            />
            <div className="errors">{nameError}</div>
          </div>
          <div className="input2">
            <input
              type="text"
              id="eori"
              placeholder="Eori number"
              {...register("eori")}
            />
            <div className="errors"></div>
            <input
              type="text"
              id="address"
              placeholder="Company address"
              {...register("address")}
            />
            <div className="errors">{addresError}</div>

            <select className="country" id="country" {...register("country")}>
              <option value="" hidden>
                Country
              </option>
              <option value="1">1</option>
            </select>
            <div className="errors">{countryError}</div>
          </div>
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
