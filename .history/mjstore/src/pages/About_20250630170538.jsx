import React from "react";
import { Container, Row, Col, Card } from "react-bootstrap";
import { FaRegSmile, FaShippingFast, FaShieldAlt } from "react-icons/fa";
import { RiCustomerService2Line } from "react-icons/ri";

const About = () => {
  return (
    <Container className="my-5">
      {/* Header Section */}
      <Row className="mb-5 text-center">
        <Col>
          <h1 className="display-4 fw-bold text-success">About MJ Store</h1>
          <p className="text-muted fs-5 mt-3">
            Your one-stop destination for premium products delivered with care and efficiency.
          </p>
        </Col>
      </Row>

      {/* Who We Are & Our Mission Section */}
      <Row className="gy-4">
        <Col md={6}>
          <Card className="shadow-lg border-0 h-100">
            <Card.Body>
              <div className="d-flex align-items-center mb-4">
                <FaRegSmile size="2rem" className="me-3 text-success" />
                <h3 className="fw-semibold mb-0">Who We Are</h3>
              </div>
              <p className="text-muted">
                MJ Store is an e-commerce platform dedicated to bringing you the best quality
                products at affordable prices. Whether you're shopping for electronics, fashion,
                home decor, or more, we've got you covered. Founded on the principles of trust,
                quality, and customer satisfaction, we strive to make your online shopping
                experience seamless and enjoyable.
              </p>
            </Card.Body>
          </Card>
        </Col>
        <Col md={6}>
          <Card className="shadow-lg border-0 h-100">
            <Card.Body>
              <div className="d-flex align-items-center mb-4">
                <FaShippingFast size="2rem" className="me-3 text-success" />
                <h3 className="fw-semibold mb-0">Our Mission</h3>
              </div>
              <p className="text-muted">
                At MJ Store, our mission is simple: to provide a curated selection of products that
                meet your everyday needs. We focus on delivering top-notch customer service,
                ensuring that your journey from browsing to receiving your purchase is smooth and
                hassle-free.
              </p>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      {/* Why Choose Us Section */}
      <Row className="mt-5">
        <Col>
          <Card className="shadow-lg border-0">
            <Card.Body>
              <div className="text-center mb-4">
                <h3 className="fw-semibold mb-3 text-success">Why Choose MJ Store?</h3>
              </div>
              <Row className="gy-4">
                <Col md={3} xs={6} className="text-center">
                  <FaShieldAlt size="2rem" className="text-success mb-3" />
                  <p className="mb-0 fw-semibold">Secure Payments</p>
                </Col>
                <Col md={3} xs={6} className="text-center">
                  <RiCustomerService2Line size="2rem" className="text-success mb-3" />
                  <p className="mb-0 fw-semibold">Top Customer Support</p>
                </Col>
                <Col md={3} xs={6} className="text-center">
                  <FaShippingFast size="2rem" className="text-success mb-3" />
                  <p className="mb-0 fw-semibold">Fast Delivery</p>
                </Col>
                <Col md={3} xs={6} className="text-center">
                  <FaRegSmile size="2rem" className="text-success mb-3" />
                  <p className="mb-0 fw-semibold">Wide Product Range</p>
                </Col>
              </Row>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      {/* Footer Section */}
      <Row className="mt-5 text-center">
        <Col>
          <p className="text-muted fs-6">
            MJ Store © {new Date().getFullYear()} | All rights reserved.
          </p>
        </Col>
      </Row>
    </Container>
  );
};

export default About;
