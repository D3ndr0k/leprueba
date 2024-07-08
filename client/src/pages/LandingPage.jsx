import React from "react";
import { Link } from "react-router-dom";
import "./LandingPage.css";
import img from "../assets/img/img";
// import Footer from "../components/Footer";
import MainHeader from "../components/MainHeader";
function LandingPage() {
  return (
    <>
      <MainHeader />
      <div className="main">
        <p>MUCH MORE THAN A SUPPLIERS</p>
        <Link to="/apply">ENTER FOR FREE</Link>
      </div>
      <section className="conten-center">
        <figure className="mainlogos">
          <img src={img.mainlogo1} alt="Exlusive products" />
          <img src={img.mainlogo2} alt="Personalized advice" />
          <img src={img.mainlogo3} alt="Wholesale" />
          <img src={img.mainlogo4} alt="Real time deals" />
        </figure>
      </section>
      <div className="know-prod">
        <p>Know our products</p>
      </div>
      <section className="conten-center">
        <ul className="ul-know-prod">
          <li>
            <Link to="">Cut Base</Link>
            <picture>
              <img src={img.cutbase} alt="Cut Base" />
            </picture>
          </li>
          <li>
            <Link to="">Pieces</Link>
            <picture>
              <img src={img.cutbase} alt="Cut Base" />
            </picture>
          </li>
          <li>
            <Link to="">Shapes</Link>
            <picture>
              <img src={img.cutbase} alt="Cut Base" />
            </picture>
          </li>
          <li>
            <Link to="">Natural</Link>
            <picture>
              <img src={img.cutbase} alt="Cut Base" />
            </picture>
          </li>
          <li>
            <Link to="">Specimens</Link>
            <picture>
              <img src={img.cutbase} alt="Cut Base" />
            </picture>
          </li>
          <li>
            <Link to="">Big & Giant Pieces</Link>
            <picture>
              <img src={img.cutbase} alt="Cut Base" />
            </picture>
          </li>
        </ul>
      </section>
    </>
  );
}

export default LandingPage;
