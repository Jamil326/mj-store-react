import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import { FaShippingFast, FaExchangeAlt } from "react-icons/fa";
import { BiGift } from "react-icons/bi";

const Banner = () => {
  const features = [
    { icon: <FaShippingFast />, text: "Same Day Delivery" },
    { icon: <FaExchangeAlt />, text: "3 Days Replacement" },
    { icon: <BiGift />, text: "Free Delivery" },
  ];

  return (
    <Container fluid className="py-3 border  bg-light border-bottom">
      <Row className="justify-content-center">
        {features.map((feature, index) => (
          <Col key={index} xs={4} md={3} className="text-center">
            <div className="d-flex align-items-center flex-column">
              <div className="fs-3 text-secondary">{feature.icon}</div>
              <div className="mt-2 text-dark">{feature.text}</div>
            </div>
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default Banner;
