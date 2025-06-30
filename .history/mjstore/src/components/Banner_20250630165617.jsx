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
    <Container
      fluid
      className="py-3"
      style={{
        background: "linear-gradient(to right, #dfffd6, #f4fff4)", // Subtle green gradient
        borderBottom: "2px solid #198754", // Success-themed border
      }}
    >
      <Row className="justify-content-center">
        {features.map((feature, index) => (
          <Col key={index} xs={4} md={3} className="text-center">
            <div className="d-flex align-items-center flex-column">
              <div
                className="fs-3 text-success"
                style={{
                  background: "rgba(25, 135, 84, 0.1)", // Light green circular background
                  borderRadius: "50%",
                  padding: "15px",
                }}
              >
                {feature.icon}
              </div>
              <div className="mt-2 fw-bold text-dark">{feature.text}</div> {/* Text in a neutral tone */}
            </div>
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default Banner;
