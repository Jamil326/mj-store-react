import React from "react";
import { Container, Row, Col, Card, Button } from "react-bootstrap";
import { AiOutlineMail } from "react-icons/ai";
import { BsWhatsapp } from "react-icons/bs";
import { useNavigate } from "react-router-dom";

const Contact = () => {
  const navigate = useNavigate();

  return (
    <Container className="my-5">
      {/* Header Section */}
      <Row className="mb-5 text-center">
        <Col>
          <h1 className="display-4 fw-bold text-success">Contact Us</h1>
          <p className="text-muted fs-5 mt-3">
            We'd love to hear from you! Reach out to us anytime, and we'll get back to you as soon as possible.
          </p>
        </Col>
      </Row>

      {/* Contact Details Section */}
      <Row className="d-flex justify-content-center">
        <Col md={6}>
          <Card className="shadow-lg border-0 rounded">
            <Card.Body>
              <h3 className="fw-semibold mb-4 text-center">Get in Touch</h3>
              <p className="text-muted text-center">
                Whether you have a question, need assistance, or just want to share your feedback, feel free to contact us.
              </p>
              <div className="d-flex align-items-center mt-4">
                <AiOutlineMail size="2rem" className="me-3 text-primary" />
                <div>
                  <p className="mb-1 fw-bold">Email</p>
                  <p className="text-dark mb-0">mjst@gmail.com</p>
                </div>
              </div>
              <hr />
              <div className="d-flex align-items-center mt-4">
                <BsWhatsapp size="2rem" className="me-3 text-success" />
                <div>
                  <p className="mb-1 fw-bold">WhatsApp</p>
                  <p className="text-dark mb-0">+91 8240059967</p>
                </div>
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      {/* Navigation Section */}
      <Row className="mt-5 text-center">
        <Col>
          <Button
            variant="success"
            className="fw-bold px-5 py-2"
            size="lg"
            onClick={() => navigate("/")}
          >
            Go Back to Home
          </Button>
        </Col>
      </Row>
    </Container>
  );
};

export default Contact;
