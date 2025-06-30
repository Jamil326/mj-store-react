import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Card, Form, Row, Col, Dropdown, Pagination } from "react-bootstrap";

const ProductPage = () => {
return (
  <div>
    <h1>productpage</h1>
  </div>
)

}
export default ProductPage;
import React, { useState } from "react";
import { Container, Row, Col, Card, Button, Badge } from "react-bootstrap";
import { AiOutlineHeart } from "react-icons/ai";
import { BsArrowRight } from "react-icons/bs";

const ProductPage = ({ product }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false); // Simulate login status

  const handleNotifyMe = () => {
    if (!isLoggedIn) {
      alert("Please log in to receive notifications!");
    } else {
      alert("You will be notified when this product is back in stock.");
    }
  };

  return (
    <Container className="my-5">
      {product ? (
        <Row>
          {/* Product Image */}
          <Col md={6}>
            <Card className="shadow-sm">
              <Card.Img
                variant="top"
                src={product.image}
                alt={product.name}
                className="rounded"
              />
            </Card>
          </Col>

          {/* Product Details */}
          <Col md={6}>
            <h1 className="fw-bold">{product.name}</h1>
            <h3 className="text-success fw-bold">₹{product.price}</h3>
            {product.isAvailable ? (
              <Badge bg="success" className="mb-3">
                In Stock
              </Badge>
            ) : (
              <Badge bg="danger" className="mb-3">
                Out of Stock
              </Badge>
            )}

            <p className="mt-4">{product.description}</p>

            {product.isAvailable ? (
              <Button variant="success" size="lg">
                Add to Cart
              </Button>
            ) : (
              <Button
                variant="warning"
                size="lg"
                onClick={handleNotifyMe}
                className="mt-3"
              >
                Notify Me
              </Button>
            )}
          </Col>
        </Row>
      ) : (
        <Row className="text-center">
          <Col>
            <Card className="shadow-sm p-4">
              <h2 className="fw-bold">Product Unavailable</h2>
              <p className="text-muted">
                This product is currently unavailable or no longer exists. Check out other options!
              </p>
              <Button variant="success" className="mt-3" href="/products">
                Explore Products <BsArrowRight />
              </Button>
            </Card>
          </Col>
        </Row>
      )}

      {/* Related Products */}
      <Row className="mt-5">
        <Col className="text-center">
          <h3 className="fw-bold mb-4">You May Also Like</h3>
        </Col>
        {[1, 2, 3].map((item, index) => (
          <Col key={index} md={4}>
            <Card className="shadow-sm">
              <Card.Img
                variant="top"
                src="https://via.placeholder.com/300"
                alt="Related Product"
                className="rounded"
              />
              <Card.Body>
                <h5 className="fw-bold">Product {item}</h5>
                <Button variant="outline-success" className="mt-2">
                  View Product
                </Button>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default ProductPage;
