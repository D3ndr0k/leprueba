import React from "react";
import { Link } from "react-router-dom";
import "./LandingPage.css";
import img from "../assets/img/img";
import MainHeader from "../components/MainHeader";
import Footer from "../components/Footer";

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

      <div className="products">
        <p>Know our products</p>
      </div>
      <section className="conten-center">
        <ul className="ul-products">
          <li>
            <Link to="/cutbase">Cut Base</Link>
            <Link to="/cutbase">
              <picture>
                <img src={img.cutbase} alt="Cut Base" />
              </picture>
            </Link>
          </li>
          <li>
            <Link to="/pieces">Pieces</Link>
            <Link to="/pieces">
              <picture>
                <img src={img.piece} alt="Piece" />
              </picture>
            </Link>
          </li>
          <li>
            <Link to="/shapes">Shapes</Link>{" "}
            <Link to="/shapes">
              <picture>
                <img src={img.shape} alt="Shape" />
              </picture>
            </Link>
          </li>
          <li>
            <Link to="/natural">Natural</Link>
            <Link to="/natural">
              <picture>
                <img src={img.natural} alt="Natural" />
              </picture>
            </Link>
          </li>
          <li>
            <Link to="/specimen">Specimens</Link>
            <Link to="/specimen">
              <picture>
                <img src={img.specimen} alt="Specimen" />
              </picture>
            </Link>
          </li>
          <li>
            <Link to="/bigpieces">Big & Giant Pieces</Link>
            <Link to="bigpieces">
              <picture>
                <img src={img.big} alt="Big and giant pieces" />
              </picture>
            </Link>
          </li>
        </ul>
      </section>
      <Footer />
    </>
  );
}

export default LandingPage;
