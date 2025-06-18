import { Container, Row, Col, Card } from "react-bootstrap";

const About = () => {
  return (
    <Container className="my-5">
      <Row>
        <Col className="text-center">
          <h1 className="display-4 fw-bold">About MJ Store</h1>
          <p className="text-muted fs-5 mt-3">
            Your one-stop destination for premium products delivered with care and efficiency.
          </p>
        </Col>
      </Row>
      <Row className="mt-4 d-flex justify-content-center">
        <Col md={6}>
          <Card className="shadow-sm border-0">
            <Card.Body>
              <h3 className="fw-semibold mb-3">Who We Are</h3>
              <p>
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
          <Card className="shadow-sm border-0">
            <Card.Body>
              <h3 className="fw-semibold mb-3">Our Mission</h3>
              <p>
                At MJ Store, our mission is simple: to provide a curated selection of products that
                meet your everyday needs. We focus on delivering top-notch customer service,
                ensuring that your journey from browsing to receiving your purchase is smooth and
                hassle-free.
              </p>
            </Card.Body>
          </Card>
        </Col>
      </Row>
      <Row className="mt-4">
        <Col>
          <Card className="shadow-sm border-0">
            <Card.Body>
              <h3 className="fw-semibold mb-3 text-center">Why Choose MJ Store?</h3>
              <ul className="list-unstyled fs-5">
                <li>✔️ Wide range of quality products</li>
                <li>✔️ Fast and reliable delivery</li>
                <li>✔️ Secure payment options</li>
                <li>✔️ Exceptional customer support</li>
              </ul>
            </Card.Body>
          </Card>
        </Col>
      </Row>
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
