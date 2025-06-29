import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import {
  Container,
  Row,
  Col,
  Form,
  Dropdown,
  Card,
  Spinner,
} from "react-bootstrap";
import { FaHeadphones, FaTools } from "react-icons/fa";
import { GiClothes } from "react-icons/gi";
import ProductCard from "../components/ProductCard";
import { toast } from "react-toastify";

const Home = () => {
  const navigate = useNavigate();

  const [page, setPage] = useState(1);
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true); // Indicates if more products are available
  const loaderRef = useRef(null);

  const categories = [
    { name: "Hardware", icon: <FaTools /> },
    { name: "Electronic", icon: <FaHeadphones /> },
    { name: "All", icon: <GiClothes /> },
  ];

  const fetchProducts = async (currentPage) => {
    if (!hasMore) return; // Prevent API call if no more products are available
    const limit = 16;
    const apiUrl = `https://mj-store.onrender.com/api/v1/product/get/product?page=${currentPage}&limit=${limit}`;
    setIsLoading(true);

    try {
      const res = await fetch(apiUrl, {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      });

      const data = await res.json();

      if (!res.ok || !data?.data?.getProduct?.length) {
        setHasMore(false); // Stop fetching if no more products are available
        return;
      }

      setProducts((prevProducts) => [...prevProducts, ...data.data.getProduct]);
    } catch (error) {
      toast.error("Error fetching products.");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (hasMore) fetchProducts(page);
  }, [page, hasMore]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && hasMore && !isLoading) {
          setPage((prevPage) => prevPage + 1);
        }
      },
      { threshold: 1.0 }
    );

    if (loaderRef.current) observer.observe(loaderRef.current);

    return () => {
      if (loaderRef.current) observer.unobserve(loaderRef.current);
    };
  }, [loaderRef, hasMore, isLoading]);

  const handleProductClick = (id) => {
    const selectedProduct = products.find((product) => product._id === id);
    if (selectedProduct) {
      navigate("/productDetails", { state: { product: selectedProduct } });
    }
  };

  return (
    <div className="d-flex flex-column bg-light">
      {/* Header Section */}
      <Container fluid className="py-3 bg-white shadow-sm sticky-top">
        <Row className="align-items-center">
          <Col xs={12} sm={6}>
            <Form.Control
              type="text"
              placeholder="Search for products..."
              className="rounded-pill"
            />
          </Col>
          <Col xs={12} sm={6} className="d-flex justify-content-sm-end">
            <Dropdown>
              <Dropdown.Toggle variant="outline-dark" id="sort-options">
                Sort
              </Dropdown.Toggle>
              <Dropdown.Menu>
                <Dropdown.Item>Default</Dropdown.Item>
                <Dropdown.Item>Price: Low to High</Dropdown.Item>
                <Dropdown.Item>Price: High to Low</Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </Col>
        </Row>
      </Container>

      {/* Categories Section */}
      <Container fluid className="py-3">
        <Row className="justify-content-center">
          {categories.map((category, index) => (
            <Col
              key={`${category.name}-${index}`}
              xs={4}
              sm={3}
              className="text-center p-2 category-card"
            >
              <Card
                className="p-3 shadow-sm rounded"
                style={{ cursor: "pointer" }}
              >
                <div className="text-center text-success fs-2">
                  {category.icon}
                </div>
                <div className="mt-2 fw-bold">{category.name}</div>
              </Card>
            </Col>
          ))}
        </Row>
      </Container>

      {/* Product Grid Section */}
      <Container fluid className="mt-4">
        <Row className="g-4">
          {products.map((product, index) => (
            <Col
              key={`${product._id}-${index}`}
              xs={6}
              sm={4}
              md={3}
              lg={}
              className="d-flex justify-content-center"
              onClick={() => handleProductClick(product._id)}
            >
              <ProductCard product={product} />
            </Col>
          ))}
        </Row>
        {isLoading && (
          <div className="text-center py-3">
            <Spinner animation="border" variant="success" />
          </div>
        )}
        <div ref={loaderRef} style={{ height: "1px" }} />
      </Container>
    </div>
  );
};

export default Home;
