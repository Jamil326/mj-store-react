import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { Container, Row, Col, Form, Dropdown, Card, Spinner } from "react-bootstrap";
import { FaHeadphones, FaTools } from "react-icons/fa";
import { GiClothes } from "react-icons/gi";
import ProductCard from "../components/ProductCard";
import { toast } from "react-toastify";

const Home = () => {
  const navigate = useNavigate();

  const [page, setPage] = useState(1);
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true); // Track if more data is available
  const loaderRef = useRef(null);

  const categories = [
    { name: "Hardware", icon: <FaTools /> },
    { name: "Electronic", icon: <FaHeadphones /> },
    { name: "All", icon: <GiClothes /> },
  ];

  const fetchProducts = async (currentPage) => {
    const limit = 16;
    const baseUrl = `https://mj-store.onrender.com/api/v1/product/get/product?page=${currentPage}&limit=${limit}`;
    setIsLoading(true);

    try {
      const res = await fetch(baseUrl, {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      });

      const data = await res.json();

      if (!res.ok || !data?.data?.getProduct?.length) {
        setHasMore(false); // Stop fetching when no more data
        return;
      }

      setProducts((prev) => [...prev, ...data.data.getProduct]); // Append new products
    } catch (error) {
      toast.warn("Failed to fetch products.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleProductClick = (id) => {
    const selectedProduct = products.find((item) => item._id === id);
    if (selectedProduct) {
      navigate("/productDetails", { state: { product: selectedProduct } });
    }
  };

  useEffect(() => {
    fetchProducts(page);
  }, [page]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && hasMore && !isLoading) {
          setPage((prev) => prev + 1); // Load next page when the loader is visible
        }
      },
      { threshold: 1 }
    );

    if (loaderRef.current) {
      observer.observe(loaderRef.current);
    }

    return () => {
      if (loaderRef.current) {
        observer.unobserve(loaderRef.current);
      }
    };
  }, [loaderRef, hasMore, isLoading]);

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
            <Col key={index} xs={4} sm={3} className="text-center p-2">
              <Card className="p-3 shadow-sm rounded" style={{ cursor: "pointer" }}>
                <div className="text-center text-success fs-2">{category.icon}</div>
                <div className="mt-2 fw-bold">{category.name}</div>
              </Card>
            </Col>
          ))}
        </Row>
      </Container>

      {/* Product Grid Section */}
      <Container fluid>
        <Row className="g-4">
          {products.map((product) => (
            <Col key={product._id} xs={6} sm={4} md={3} className="d-flex justify-content-center">
              <ProductCard product={product} />
            </Col>
          ))}
        </Row>
        <div ref={loaderRef} className="text-center py-3">
          {isLoading && <Spinner animation="border" variant="success" />}
        </div>
      </Container>
    </div>
  );
};

export default Home;
