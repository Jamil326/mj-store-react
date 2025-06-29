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
    // Simulated API call
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
      className="p-3"
      style={{
        minHeight: "100vh", // Reduced container height to 90% of the viewport
        paddingBottom: "80px", // Ensure content doesn't overlap the buttons
      }}
    >
      {/* Product Details Section */}
      <Row>
        <Col xs={12} className="mb-4">
          <ProductDetailCard Product={product} />
        </Col>
      </Row>

      {/* Floating Action Buttons */}
      <div
        className="d-flex justify-content-around align-items-center bg-light shadow-lg"
        style={{
          position: "fixed",
          bottom: "20px",
          left: "50%",
          transform: "translateX(-50%)",
          width: "90%",
          padding: "10px",
          borderRadius: "10px",
          zIndex: 1030,
        }}
      >
        <Button
          variant="outline-dark"
          className="fw-bold text-success"
          onClick={handleAddToCart}
        >
          Add to Cart
        </Button>
        <Button
          variant="success"
          className="fw-bold text-light"
          onClick={handleBuyNow}
        >
          Buy Now
        </Button>
      </div>
    </Container>
  );
};

export default ProductDetails;
