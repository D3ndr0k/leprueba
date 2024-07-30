import React from "react";
import Slider from "react-slick";
import "./Products.css";
import MainHeader from "../components/MainHeader";
import Footer from "../components/Footer";
import img from "../assets/img/img";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

function Specimen() {
  const settings = {
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  return (
    <>
      <MainHeader />
      <div className="back">
        <div className="cont">
          <Slider {...settings}>
            <div className="product">
              <img src={img.specimen} alt="Slide 1" />
            </div>
            <div className="product">
              <img src={img.specimen} alt="Slide 2" />
            </div>
            <div className="product">
              <img src={img.specimen} alt="Slide 3" />
            </div>
          </Slider>
        </div>
      </div>
      <section className="textprod">
        <h1>SPECIMEN</h1>
        <p>(000kg - 000kg)</p>
        <p>
          Lorem ipsum dolor sit, amet consectetur adipisicing elit. Repellendus
          quis veritatis delectus non, vel iure corporis aliquid molestias nisi
          reiciendis autem nam cum facere ullam aliquam quisquam ipsam molestiae
          iusto!
        </p>
        <p>
          Ipsum dolor sit, amet consectetur adipisicing elit. Repellendus quis
          veritatis delectus non, vel iure corporis aliquid molestias nisi
          reiciendis autem nam cum facere ullam aliquam quisquam ipsam molestiae
          iusto!
        </p>
      </section>
      <Footer />
    </>
  );
}

export default Specimen;
