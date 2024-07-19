import { Link } from "react-router-dom";
import { FiMenu } from "react-icons/fi";
import { BiUser, BiShoppingBag, BiSearch } from "react-icons/bi";
import "./MainHeader.css";
import { useAuth } from "../context/AuthContext";

function HomeHeadre() {
  const { user, logout } = useAuth();

  return (
    <>
      <header id="main-header">
        <Link to="/">
          <picture>
            <img src="{img.logo}" alt="Logo Le Stage" />
          </picture>
        </Link>
        <div className="hola">
          <input className="menu-open" id="menu-open" type="checkbox" />
          <label htmlFor="menu-open">
            <FiMenu color="#fff" size={24} />
          </label>

          <nav id="menu">
            <Link className="linknav" to="#">
              <BiUser size={20} />
              Hi {user}
            </Link>
            <Link className="linknav" to="#">
              <BiShoppingBag size={20} />
              Get number
            </Link>
            <form action="" className="search linknav" method="get">
              <button className="btn-no " type="submit">
                <BiSearch size={20} />
              </button>
              <input
                type="text"
                name="search"
                id="search"
                placeholder="Search"
              />
            </form>
            <Link to="/" onClick={() => logout()}>
              Logout
            </Link>
          </nav>
        </div>
      </header>
    </>
  );
}

export default HomeHeadre;
