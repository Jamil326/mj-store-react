import React from "react";
import ProductDetailCard from "../components/ProductDetailCard";
import { useLocation, useNavigate } from "react-router-dom";
import { Button, Container, Row, Col, Carousel, Image } from "react-bootstrap";
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

  const isLoggedIn = () => {
    const token = localStorage.getItem("token");
    return !!token; // Return true if token exists, false otherwise
  };

  const handleAddToCart = async () => {
    if (!isLoggedIn()) {
      toast.error("You need to log in to add items to your cart.");
      navigate("/login");
      return;
    }

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
        toast.success(`${product.name} added to cart successfully!`);
        navigate("/cart");
      } else {
        const error = await response.json();
        toast.error(`Failed to add product: ${error.message}`);
      }
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
      className="p-3 mb-5 pb-5"
      style={{
        paddingBottom: "140px", // Space for buttons and footer
      }}
    >
      {/* Carousel Section */}
      {product.images?.length > 0 && (
        <Row className="mb-4">
          <Col xs={12}>
            <Carousel className="shadow-sm rounded">
              {product.images.map((image, index) => (
                <Carousel.Item key={index}>
                  <Image
                    src={image.url}
                    alt={`Product image ${index + 1}`}
                    fluid
                    className="d-block w-100"
                    style={{ maxHeight: "400px", objectFit: "cover" }}
                  />
                </Carousel.Item>
              ))}
            </Carousel>
          </Col>
        </Row>
      )}

      {/* All Images in a Single Row */}
      {product.images?.length > 0 && (
        <Row className="mb-4">
          <Col xs={12} className="d-flex flex-row overflow-auto gap-3">
            {product.images.map((image, index) => (
              <Image
                key={index}
                src={image.url}
                alt={`Thumbnail ${index + 1}`}
                fluid
                className="rounded shadow-sm"
                style={{ width: "150px", height: "150px", objectFit: "cover" }}
              />
            ))}
          </Col>
        </Row>
      )}

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
            variant="outline-success"
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
