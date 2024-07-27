import HomeHeadre from "../components/HomeHeadre";
import { Link } from "react-router-dom";
import "./HomeUser.css";
import Popuphome from "../components/Popuphome";
import { useState } from "react";
import img from "../assets/img/img";

function HomeUser() {
  const [closeModal, setCloseModal] = useState(true);

  return (
    <>
      <HomeHeadre />
      {closeModal && <Popuphome onClose={() => setCloseModal(false)} />}

      <div className="fakeheader"></div>
      <div className="main-home">
        <p>Ready for the best amethysts?</p>
      </div>

      <div className="products">
        <p>What product are you looking for</p>
      </div>
      <section className="conten-center">
        <ul className="ul-products">
          <li>
            <Link to="">Cut Base</Link>
            <picture>
              <img src={img.cutbase} alt="Cut Base" />
            </picture>
          </li>
          <li>
            <Link to="">Pieces</Link>
            <picture>
              <img src={img.piece} alt="Piece" />
            </picture>
          </li>
          <li>
            <Link to="">Shapes</Link>
            <picture>
              <img src={img.shape} alt="Shape" />
            </picture>
          </li>
          <li>
            <Link to="">Natural</Link>
            <picture>
              <img src={img.natural} alt="Natural" />
            </picture>
          </li>
          <li>
            <Link to="">Specimens</Link>
            <picture>
              <img src={img.specimen} alt="Specimen" />
            </picture>
          </li>
          <li>
            <Link to="">Big & Giant Pieces</Link>
            <picture>
              <img src={img.big} alt="Big and giant pieces" />
            </picture>
          </li>
        </ul>
      </section>
    </>
  );
}
export default HomeUser;
