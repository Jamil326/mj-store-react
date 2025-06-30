import React from "react";
import { Container } from "react-bootstrap";
import { FaShippingFast, FaExchangeAlt } from "react-icons/fa";
import { BiGift } from "react-icons/bi";

const Banner = () => {
  const features = [
    { icon: <FaShippingFast />, text: "Same Day Delivery" },
    { icon: <FaExchangeAlt />, text: "3 Days Replacement Guarantee" },
    { icon: <BiGift />, text: "Free Delivery" },
  ];

  return (
    <Container
      fluid
      className="py-4 bg-light border-bottom d-flex justify-content-center align-items-center"
    >
      <div className="d-flex flex-wrap justify-content-around gap-4 w-100">
        {features.map((feature, index) => (
          <div
            key={index}
            className="d-flex flex-column align-items-center justify-content-center p-3 rounded bg-white shadow-sm"
            style={{ flex: "1 1 300px", maxWidth: "300px", textAlign: "center" }}
          >
            <div className="fs-2 text-primary">{feature.icon}</div>
            <div className="mt-2 fw-bold text-dark">{feature.text}</div>
          </div>
        ))}
      </div>
    </Container>
  );
};

export default Banner;
