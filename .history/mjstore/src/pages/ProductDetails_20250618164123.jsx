import ProductDetailCard from "../components/ProductDetailCard";
import { useLocation, useNavigate } from "react-router-dom";
import { Button } from "react-bootstrap";

const ProductDetails = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { product } = location.state || {};

  const handleCart = () => {
    navigate("/checkout", { state: { item: product } });
  };

  return (
    <div className="container-fluid p-3">
      {/* Product Details */}
      <div className="mb-5">
        <ProductDetailCard Product={product} />
      </div>

      {/* Sticky Action Buttons */}
      <div
        className="d-flex gap-3 justify-content-center position-sticky"
        style={{ bottom: "1rem" }}
      >
        <Button variant="dark" className="px-3 py-2 w-50">
          Add to Cart
        </Button>
        <Button
          onClick={handleCart}
          variant="success"
          className="px-3 py-2 w-50"
        >
          Buy Now
        </Button>
      </div>
    </div>
  );
};

export default ProductDetails;
