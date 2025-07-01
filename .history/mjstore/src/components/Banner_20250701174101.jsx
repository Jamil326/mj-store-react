import React from "react";
import { Container, Row, Col, Card } from "react-bootstrap";
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
      <Row className="justify-content-center g-2">
        {features.map((feature, index) => (
          <Col key={index} xs="auto">
            <Card className="shadow-sm border-0 text-center" style={{ width: "12rem" }}>
              <Card.Body className="d-flex flex-column align-items-center">
                <div className="fs-2 text-success mb-2">{feature.icon}</div>
                <Card.Text className="fw-bold text-dark">{feature.text}</Card.Text>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default Banner;
