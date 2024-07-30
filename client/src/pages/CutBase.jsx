import React from "react";
import "./Products.css";
import MainHeader from "../components/MainHeader";
import img from "../assets/img/img";

function CutBase() {
  return (
    <>
      <MainHeader />
      <div className="back">
        <div className="product">
          <img src={img.cutbase} alt="Cut Base" />
        </div>
        <section className="textprod">
          <h1>CUT BASE</h1>
          <p>(000kg - 000kg)</p>
          <p>
            Lorem ipsum dolor sit, amet consectetur adipisicing elit.
            Repellendus quis veritatis delectus non, vel iure corporis aliquid
            molestias nisi reiciendis autem nam cum facere ullam aliquam
            quisquam ipsam molestiae iusto!
          </p>
          <p>
            Ipsum dolor sit, amet consectetur adipisicing elit. Repellendus quis
            veritarem ipsum dolor sit, amet consectetur adipisicing elit.
            Repellendus quis veritatis delectus non, vel iure corporis aliquid
            molestias nisi reiciendis autem nam cum facere ullam aliquam
            quisquam ipsam molestiae iusto!
          </p>
        </section>
      </div>
    </>
  );
}

export default CutBase;
