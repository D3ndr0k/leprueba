import { FiMenu } from "react-icons/fi";
import { Link } from "react-router-dom";
import "./MainHeader.css";
import img from "../assets/img/img.js";

export default function MainHeader() {
  return (
    <>
      <header id="main-header">
        <Link to="/">
          <picture>
            <img src={img.logoLeStage} alt="Logo Le Stage" />
          </picture>
        </Link>
        <div>
          <input className="menu-open" id="menu-open" type="checkbox" />
          <label htmlFor="menu-open">
            <FiMenu color="#fff" size={24} />
          </label>

          <nav id="menu">
            <Link to="/apply">Application</Link>
            <Link to="/login">Log in</Link>
            <Link to="/aboutus">About us</Link>
            <Link to="/contactus">Contact</Link>
          </nav>
        </div>
      </header>
    </>
  );
}
