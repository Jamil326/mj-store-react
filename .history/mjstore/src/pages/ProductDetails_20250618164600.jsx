import ProductDetailCard from "../components/ProductDetailCard";
import { useLocation, useNavigate } from "react-router-dom";
import { Button, Container, Row, Col } from "react-bootstrap";

const ProductDetails = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { product } = location.state || {};

  const handleAddToCart = () => {
    // Add to cart logic here
    console.log("Added to cart:", product);
  };

  const handleBuyNow = () => {
    navigate("/checkout", { state: { item: product } });
  };

  return (
    <Container className="py-4">
      {/* Product Details Section */}
      <Row className="mb-4">
        <Col xs={12}>
          <ProductDetailCard Product={product} />
        </Col>
      </Row>

      {/* Action Buttons Section */}
      <Row className="fixed-bottom bg-light py-3 shadow">
        <Col xs={6} className="pe-1">
          <Button
            variant="outline-dark"
            className="w-100 py-2 fw-bold"
            onClick={handleAddToCart}
          >
            Add to Cart
          </Button>
        </Col>
        <Col xs={6} className="ps-1">
          <Button
            variant="success"
            className="w-100 py-2 fw-bold"
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
