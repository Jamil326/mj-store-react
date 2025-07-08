import React, {
  useCallback,
  useState,
  useEffect,
  Suspense,
} from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { Button, Container, Row, Col, Spinner } from "react-bootstrap";
import { toast } from "react-toastify";

const ProductDetailCard = React.lazy(() =>
  import("../components/ProductDetailCard")
);

const ProductDetails = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { productId } = useParams();

  const productFromState = location.state?.product;
  const [product, setProduct] = useState(productFromState || null);
  const [loading, setLoading] = useState(!productFromState);
  const [isProcessing, setIsProcessing] = useState(false);

  const isLoggedIn = useCallback(() => {
    return !!localStorage.getItem("token");
  }, []);

  useEffect(() => {
    if (!productFromState && productId) {
      const fetchProduct = async () => {
        try {
          const res = await fetch(`https://mj-store.onrender.com/api/v1/product/${productId}`);
          const data = await res.json();

          if (res.ok && data?.data) {
            setProduct({ ...data.data, rating: 4 });
          } else {
            toast.warn("Product not found.");
          }
        } catch {
          toast.error("Failed to fetch product details.");
        } finally {
          setLoading(false);
        }
      };

      fetchProduct();
    }
  }, [productFromState, productId]);

  const handleAddToCart = async () => {
    if (isProcessing || !product) return;

    if (!isLoggedIn()) {
      toast.warn("Please log in to add items to your cart.");
      return;
    }

    setIsProcessing(true);

    try {
      const response = await fetch("https://mj-store.onrender.com/api/v1/user/cart/add", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify({ productId: product._id }),
      });

      const result = await response.json();

      if (response.ok) {
        toast.success(`${product.name} added to cart successfully!`);
        navigate("/cart");
      } else {
        toast.error(`Failed to add product: ${result.message}`);
      }
    } catch {
      toast.error("An error occurred while adding to cart.");
    } finally {
      setIsProcessing(false);
    }
  };

  const handleBuyNow = useCallback(() => {
    if (isProcessing || !product) return;

    if (!isLoggedIn()) {
      toast.warn("Please log in to proceed with the purchase.");
      return;
    }

    navigate("/checkout", { state: { item: product } });
  }, [navigate, product, isProcessing, isLoggedIn]);

  if (loading) {
    return (
      <Container className="py-5 text-center">
        <Spinner animation="border" variant="success" />
        <p className="mt-2">Loading product...</p>
      </Container>
    );
  }

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

  return (
    <Container fluid className="p-3 mb-5 pb-5" style={{ paddingBottom: "140px" }}>
      <Row>
        <Col xs={12} className="mb-4">
          <Suspense
            fallback={
              <div className="text-center py-5">
                <Spinner animation="border" variant="success" />
              </div>
            }
          >
            <ProductDetailCard Product={product} />
          </Suspense>
        </Col>
      </Row>

      <Row
        className="bg-light border-top py-3 shadow-lg"
        style={{
          position: "fixed",
          bottom: "60px",
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
            disabled={isProcessing}
          >
            {isProcessing ? "Adding..." : "Add to Cart"}
          </Button>
        </Col>
        <Col xs={6} className="ps-2">
          <Button
            variant="success"
            className="w-100 py-2 fw-bold text-light"
            onClick={handleBuyNow}
            disabled={isProcessing}
          >
            {isProcessing ? "Processing..." : "Buy Now"}
          </Button>
        </Col>
      </Row>
    </Container>
  );
};

export default ProductDetails;
