import { Container, Row, Col, Card, Button } from "react-bootstrap";
import { AiOutlineMail } from "react-icons/ai";
import { BsWhatsapp } from "react-icons/bs";
import { useNavigate } from "react-router-dom";

const Contact = () => {
  const navigate = useNavigate();

  return (
    <Container className="my-5">
      <Row>
        <Col className="text-center">
          <h1 className="display-4 fw-bold">Contact Us</h1>
          <p className="text-muted fs-5 mt-3">
            We'd love to hear from you! Reach out to us anytime, and we'll get back to you as soon as possible.
          </p>
        </Col>
      </Row>
      <Row className="mt-4 d-flex justify-content-center">
        <Col md={6}>
          <Card className="shadow-sm border-0">
            <Card.Body>
              <h3 className="fw-semibold mb-3">Get in Touch</h3>
              <p>
                Whether you have a question, need assistance, or just want to share your feedback,
                feel free to contact us through the methods below.
              </p>
              <div className="d-flex align-items-center mt-4">
                <AiOutlineMail size="2rem" className="me-3 text-primary" />
                <div>
                  <p className="mb-1 fw-bold">Email</p>
                  <p className="text-dark">mafuza326khatun@gmail.com</p>
                </div>
              </div>
              <div className="d-flex align-items-center mt-4">
                <BsWhatsapp size="2rem" className="me-3 text-success" />
                <div>
                  <p className="mb-1 fw-bold">WhatsApp</p>
                  <p className="text-dark">+91 8240059967</p>
                </div>
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>
      <Row className="mt-5 text-center">
        <Col>
          <Button
            variant="primary"
            className="fw-bold"
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
