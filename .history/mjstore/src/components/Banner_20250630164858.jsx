import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import { FaShippingFast, FaExchangeAlt } from "react-icons/fa";
import { BiGift } from "react-icons/bi";

const Banner = () => {
  const features = [
    { icon: <FaShippingFast />, text: "Same Day Delivery" },
    { icon: <FaExchangeAlt />, text: "3 Days Replacement Guarantee" },
    { icon: <BiGift />, text: "Free Delivery" },
  ];

  return (
    <Container fluid className="py-4 bg-light border-bottom">
      <Row className="justify-content-center g-4">
        {features.map((feature, index) => (
          <Col
            key={index}
            xs={12}
            sm={6}
            md={4}
            className="text-center d-flex justify-content-center"
          >
            <div className="d-flex align-items-center flex-column p-3 rounded bg-white shadow-sm w-75">
              <div className="fs-2 text-primary">{feature.icon}</div>
              <div className="mt-2 fw-bold text-dark">{feature.text}</div>
            </div>
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default Banner;
