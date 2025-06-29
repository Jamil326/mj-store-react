import React from "react";
import ProductDetailCard from "../components/ProductDetailCard";
import { useLocation, useNavigate } from "react-router-dom";
import { Button, Container, Row, Col } from "react-bootstrap";
import { toast } from "react-toastify";

const ProductDetails = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { product } = location.state || {};

  if (!product) {
    return (
      <Container className="py-5 text-center">
        <h4 className="text-danger">No Product Details Found</h4>
        <Button variant="primary" onClick={() => navigate(-1)}>
          Go Back
        </Button>
      </Container>
    );
  }

  const handleAddToCart = async () => {
    try {
      toast.success(`${product.name} added to cart successfully!`);
      navigate("/cart");
    } catch (error) {
      toast.error("An error occurred while adding to cart.");
    }
  };

  const handleBuyNow = () => {
    navigate("/checkout", { state: { item: product } });
  };

  return (
    <Container
      fluid
      className="p-3 m"
      style={{
        paddingBottom: "140px", // Space for buttons and footer
      }}
    >
      {/* Product Details Section */}
      <Row>
        <Col xs={12} className="mb-4">
          <ProductDetailCard Product={product} />
        </Col>
      </Row>

      {/* Action Buttons Section */}
      <Row
        className="bg-light border-top py-3 shadow-lg"
        style={{
          position: "fixed",
          bottom: "60px", // Space for the footer
          left: 0,
          right: 0,
          zIndex: 1020,
        }}
      >
        <Col xs={6} className="pe-2">
          <Button
            variant="outline-dark"
            className="w-100 py-2 fw-bold text-success"
            onClick={handleAddToCart}
          >
            Add to Cart
          </Button>
        </Col>
        <Col xs={6} className="ps-2">
          <Button
            variant="success"
            className="w-100 py-2 fw-bold text-light"
            onClick={handleBuyNow}
          >
            Buy Now
          </Button>
        </Col>
      </Row>
    </Container>
  );
};

export default ProductDetails;
