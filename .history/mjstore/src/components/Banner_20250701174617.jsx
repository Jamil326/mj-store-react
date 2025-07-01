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
        <Card.Body className="d-flex justify-content-center align-items-center">
          {features.map((feature, index) => (
            <React.Fragment key={index}>
              {i ndex > 0 && (
                <div
                  className="border-start mx-3"
                  style={{ height: "50px", width: "1px", backgroundColor: "#ccc" }}
                ></div>
              )}
              <div className="d-flex flex-column align-items-center">
                <div className="fs-2 text-success">{feature.icon}</div>
                <div className="mt-2 fw-bold text-dark text-center">{feature.text}</div>
              </div>
            </React.Fragment>
          ))}
        </Card.Body>
      </Card>
    </Container>
  );
};

export default Banner;
