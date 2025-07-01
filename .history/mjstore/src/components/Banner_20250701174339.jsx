import React from "react";
import { Container, Card } from "react-bootstrap";
import { FaShippingFast, FaExchangeAlt } from "react-icons/fa";
import { BiGift } from "react-icons/bi";

const Banner = () => {
  const features = [
    { icon: <FaShippingFast />, text: "Same Day Delivery" },
    { icon: <FaExchangeAlt />, text: "3 Days Replacement Guarantee" },
    { icon: <BiGift />, text: "Free Delivery" },
  ];

  return (
    <Container fluid className="py-3 bg-light">
      <Card className="shadow-sm border-0">
        <Card.Body className="d-flex justify-content-center align-items-center gap-5">
          {features.map((feature, index) => (
            <div key={index} className="d-flex flex-column align-items-center">
              <div className="fs-2 text-success">{feature.icon}</div>
              <div className="mt-2 fw-bold text-dark text-center">{feature.text}</div>
            </div>
          ))}
        </Card.Body>
      </Card>
    </Container>
  );
};

export default Banner;
