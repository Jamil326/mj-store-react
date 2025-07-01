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
    <Container fluid className="py-4 bg-light">
      <Row className="justify-content-center g-3">
        {features.map((feature, index) => (
          <Col key={index} xs={12} sm={6} md={4}>
            <Card className="shadow-sm border-0 text-center">
              <Card.Body className="d-flex flex-column align-items-center">
                <div className="fs-1 text-success mb-3">{feature.icon}</div>
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
