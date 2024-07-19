import { Link } from "react-router-dom";
import { BiX } from "react-icons/bi";
import "./Popuphome.css";

function Popuphome({ onClose }) {
  return (
    <div className="pop-up">
      <Link>¿Eres nuevo aquí? Aprende a aquirir nuevos productos.</Link>
      <BiX className="x" onClick={onClose} cursor={"pointer"} />
    </div>
  );
}

export default Popuphome;
