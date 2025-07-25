import React, { useCallback, useState, useEffect, Suspense } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { Button, Container, Row, Col, Spinner } from "react-bootstrap";
import { toast } from "react-toastify";
import { FaShareAlt } from "react-icons/fa";

const ProductDetailCard = React.lazy(() => import("../components/ProductDetailCard"));

const ProductDetails = () => {
  const navigate = useNavigate();
  const { productId } = useParams();

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isProcessing, setIsProcessing] = useState(false);

  const isLoggedIn = useCallback(() => !!localStorage.getItem("token"), []);

  useEffect(() => {
    const controller = new AbortController();

    const fetchProduct = async () => {
      try {
        const res = await fetch(`https://mj-store.onrender.com/api/v1/product/get/product/${productId}`, {
          signal: controller.signal,
        });
        const data = await res.json();

        if (res.ok && data?.data) {
          setProduct(data.data);
        } else {
          toast.warn(data?.message || "Product not found.");
        }
      } catch (error) {
        if (error.name !== "AbortError") {
          toast.error("Failed to fetch product details.");
        }
      } finally {
        setLoading(false);
      }
    };

    if (productId) fetchProduct();
    return () => controller.abort(); // cleanup on unmount
  }, [productId]);

  const handleAddToCart = async () => {
    if (isProcessing || !product?._id) return;

    if (!isLoggedIn()) {
      toast.error("You need to log in to add items to your cart.");
      navigate("/login");
      return;
    }

    setIsProcessing(true);
    try {
      const res = await fetch("https://mj-store.onrender.com/api/v1/user/cart/add", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify({ productId: product._id }),
      });

      const result = await res.json();
      if (res.ok) {
        toast.success(`${product.name} added to cart successfully!`);
        navigate("/cart");
      } else {
        toast.error(result?.message || "Failed to add product.");
      }
    } catch (err) {
      toast.error("An error occurred while adding to cart.");
    } finally {
      setIsProcessing(false);
    }
  };

  const handleBuyNow = useCallback(() => {
    if (!product || isProcessing) return;
    navigate("/checkout", { state: { item: product } });
  }, [navigate, product, isProcessing]);

  const handleShareProduct = useCallback(() => {
    if (!product?._id) {
      toast.warn("Product is not shareable.");
      return;
    }

    const shareUrl = `${window.location.origin}/productDetails/${product._id}`;
    if (navigator.share) {
      navigator
        .share({
          title: product.name,
          text: "Check out this product!",
          url: shareUrl,
        })
        .catch(() => toast.info("Sharing cancelled or failed."));
    } else {
      navigator.clipboard.writeText(shareUrl);
      toast.success("Product link copied to clipboard!");
    }
  }, [product]);

  // 🔄 Show loader until API resolves
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
      {/* Top Share Button */}
      <Row className="justify-content-end mb-2">
        <Col xs="auto">
          <Button variant="outline-secondary" onClick={handleShareProduct}>
            <FaShareAlt className="me-1" />
            Share
          </Button>
        </Col>
      </Row>

      {/* Product Card */}
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

      {/* Bottom CTA Buttons */}
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
