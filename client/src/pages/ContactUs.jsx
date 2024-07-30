import "./ContactUs.css";
import MainHeader from "../components/MainHeader";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { api } from "../api/api";
import Footer from "../components/Footer";

function ContactUs() {
  const { register, handleSubmit } = useForm();
  const [error, setError] = useState();
  const [success, setSuccess] = useState();
  const [loading, setLoading] = useState(false);

  const submit = async (values) => {
    setLoading(true);
    try {
      const response = await api.post("/contactus", values);

      if (response.data.ok) {
        setSuccess(response.data.ok);
        setError(null);
      } else if (response.data.error) {
        setError(response.data.error);
        setSuccess(null);
      }
    } catch (error) {
      console.error("Error submitting the form:", error);
      setError("There was an error submitting the form.");
      setSuccess(null);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <MainHeader />
      <div className="conten">
        <form className="contact" onSubmit={handleSubmit(submit)}>
          <p>Contact us</p>
          <span className="hr"></span>
          <input
            type="text"
            name="name"
            placeholder="Name"
            {...register("name", { required: "Name is required" })}
          />
          <input
            type="email"
            name="email"
            placeholder="Email"
            {...register("email", { required: "Email is required" })}
          />
          <textarea
            name="message"
            id="message"
            placeholder="Message"
            {...register("message")}
          ></textarea>
          {error && <div className="error">{error}</div>}
          {success && <div className="success">{success}</div>}
          <button type="submit" className="btn" id="btn" disabled={loading}>
            {loading ? "Sending..." : "Send"}
          </button>
        </form>
      </div>
      <Footer />
    </>
  );
}

export default ContactUs;
