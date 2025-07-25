import React from "react";
import ProductDetailCard from "../components/ProductDetailCard";
import { useLocation, useNavigate } from "react-router-dom";
import { Button, Container, Row, Col } from "react-bootstrap";
import { useCart } from "../context/CartContext";
import { toast } from "react-toastify";

const ProductDetails = () => {
  const { addItem } = useCart();
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
    const cartUrl = "https://mj-store.onrender.com/api/v1/user/cart/add";
    const token = localStorage.getItem("token");

    try {
      const response = await fetch(cartUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ productId: product._id }),
      });

      if (response.ok) {
        const result = await response.json();

        // Add product to the global cart state
        addItem(product);

        // Show success notification
        toast.success(`${product.name} added to cart successfully!`);

        // Navigate to the cart page
        navigate("/cart");
      } else {
        const error = await response.json();
        toast.error(`Failed to add product: ${error.message}`);
      }
    } catch (error) {
      console.error("Error adding to cart:", error);
      toast.error("An error occurred while adding to cart. Please try again later.");
    }
  };

  const handleBuyNow = () => {
    navigate("/checkout", { state: { item: product } });
  };

  return (
    <Container fluid className="p-3" style={{ marginBottom: "80px" }}>
      {/* Product Details Section */}
      <Row>
        <Col xs={12} className="mb-4">
          <ProductDetailCard Product={product} />
        </Col>
      </Row>

      {/* Action Buttons Section */}
      <Row
        className="fixed-bottom bg-light border-top py-3 shadow-lg"
        style={{ zIndex: 1020, height: "70px" }}
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
