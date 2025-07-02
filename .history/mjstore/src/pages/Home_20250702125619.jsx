import React, { useState, useEffect, useRef, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import {
  Container,
  Row,
  Col,
  Form,
  Dropdown,
  Card,
  Placeholder,
} from "react-bootstrap";
import { FaHeadphones, FaTools } from "react-icons/fa";
import { GiClothes } from "react-icons/gi";
import ProductCard from "../components/ProductCard";
import Banner from '../components/Banner';
import { toast } from "react-toastify";

const SkeletonCard = () => (
  <Card className="p-2 shadow-sm w-100">
    <Placeholder as={Card.Img} animation="wave" style={{ height: '180px' }} />
    <Card.Body>
      <Placeholder animation="wave" xs={8} />
      <Placeholder animation="wave" xs={6} className="mt-2" />
    </Card.Body>
  </Card>
);

const Home = () => {
  const navigate = useNavigate();
  const [allProducts, setAllProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [sortOption, setSortOption] = useState("default");
  const loaderRef = useRef(null);
  const isInitialMount = useRef(true);

  const categories = [
    { name: "Hardware", icon: <FaTools /> },
    { name: "Electronic", icon: <FaHeadphones /> },
    { name: "All", icon: <GiClothes /> },
  ];

  const fetchProducts = useCallback(async (reset = false) => {
    if (isLoading || (!hasMore && !reset)) return;

    setIsLoading(true);
    const limit = 16;
    const targetPage = reset ? 1 : page;

    try {
      const apiUrl = `https://mj-store.onrender.com/api/v1/product/get/product?page=${targetPage}&limit=${limit}`;
      const res = await fetch(apiUrl);
      const data = await res.json();

      if (res.ok && data?.data?.getProduct) {
        const fetchedProducts = data.data.getProduct;
        if (reset) {
          setAllProducts(fetchedProducts);
          setFilteredProducts(fetchedProducts);
          setPage(1);
          setHasMore(fetchedProducts.length === limit);
        } else {
          setAllProducts((prev) => [...prev, ...fetchedProducts]);
          setFilteredProducts((prev) => [...prev, ...fetchedProducts]);
          setHasMore(fetchedProducts.length === limit);
        }
      } else {
        toast.error("Failed to fetch products.");
        setHasMore(false);
      }
    } catch (error) {
      toast.error("An error occurred while fetching products.");
    } finally {
      setIsLoading(false);
    }
  }, [page, hasMore, isLoading]);

  const searchProductsFromAPI = async (query) => {
    try {
      const encodedQuery = encodeURIComponent(query);
      const apiUrl = `https://mj-store.onrender.com/api/v1/product/search?term=${encodedQuery}`;
      const res = await fetch(apiUrl);
      const data = await res.json();

      if (res.ok && data?.data?.getProduct) {
        setFilteredProducts(data.data.getProduct);
      } else {
        toast.warn("No products found for the given query.");
        setFilteredProducts([]);
      }
    } catch (error) {
      toast.error("Error occurred while searching products.");
    }
  };

  const handleSearchChange = (e) => {
    const query = e.target.value.trim();
    setSearchQuery(query);

    if (query) {
      const localResults = allProducts.filter((product) =>
        product.name.toLowerCase().includes(query.toLowerCase())
      );

      if (localResults.length > 0) {
        setFilteredProducts(localResults);
      } else {
        searchProductsFromAPI(query);
      }
    } else {
      setFilteredProducts(allProducts);
    }
  };

  const handleSortChange = (sort) => {
    setSortOption(sort);
    const sortedProducts = [...filteredProducts];

    switch (sort) {
      case "low-to-high":
        sortedProducts.sort((a, b) => a.price - b.price);
        break;
      case "high-to-low":
        sortedProducts.sort((a, b) => b.price - a.price);
        break;
      default:
        break;
    }

    setFilteredProducts(sortedProducts);
  };

  useEffect(() => {
    fetchProducts(true);
  }, [fetchProducts]);

  useEffect(() => {
    if (page > 1 && !isInitialMount.current) {
      fetchProducts();
    }
  }, [page, fetchProducts]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasMore && !isLoading) {
          setPage((prev) => prev + 1);
        }
      },
      { threshold: 1.0 }
    );

    const currentLoader = loaderRef.current;
    if (currentLoader) observer.observe(currentLoader);

    return () => {
      if (currentLoader) observer.unobserve(currentLoader);
    };
  }, [hasMore, isLoading]);

  useEffect(() => {
    isInitialMount.current = false;
  }, []);

  const handleProductClick = (id) => {
    const selectedProduct = allProducts.find((product) => product._id === id);
    if (selectedProduct) {
      navigate("/productDetails", { state: { product: selectedProduct } });
    }
  };

  return (
    <div className="d-flex flex-column bg-light">
      <Container fluid className="py-3 bg-white shadow-sm sticky-top">
        <Row className="align-items-center">
          <Col xs={12} sm={6}>
            <Form.Control
              type="text"
              placeholder="Search for products..."
              className="rounded-pill"
              value={searchQuery}
              onChange={handleSearchChange}
            />
          </Col>
          <Col xs={12} sm={6} className="d-flex justify-content-sm-end">
            <Dropdown>
              <Dropdown.Toggle variant="outline-dark" id="sort-options">
                Sort
              </Dropdown.Toggle>
              <Dropdown.Menu>
                <Dropdown.Item onClick={() => handleSortChange("default")}>Default</Dropdown.Item>
                <Dropdown.Item onClick={() => handleSortChange("low-to-high")}>Price: Low to High</Dropdown.Item>
                <Dropdown.Item onClick={() => handleSortChange("high-to-low")}>Price: High to Low</Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </Col>
        </Row>
      </Container>

      <Container fluid className="py-3">
        <Row className="justify-content-center">
          {categories.map((category, index) => (
            <Col
              key={`${category.name}-${index}`}
              xs={4}
              sm={3}
              className="text-center p-2 category-card"
            >
              <Card className="p-3 shadow-sm rounded" style={{ cursor: "pointer" }}>
                <div className="text-center text-success fs-2">{category.icon}</div>
                <div className="mt-2 fw-bold">{category.name}</div>
              </Card>
            </Col>
          ))}
        </Row>
      </Container>

      <Banner />

      <Container fluid className="mt-4">
        <Row className="g-4">
          {isLoading && filteredProducts.length === 0
            ? Array.from({ length: 8 }).map((_, index) => (
                <Col key={index} xs={6} sm={4} md={3} className="d-flex justify-content-center">
                  <SkeletonCard />
                </Col>
              ))
            : filteredProducts.map((product, index) => (
                <Col
                  key={`${product._id}-${index}`}
                  xs={6}
                  sm={4}
                  md={3}
                  className="d-flex justify-content-center"
                  onClick={() => handleProductClick(product._id)}
                >
                  <ProductCard product={product} />
                </Col>
              ))}
        </Row>
        {isLoading && filteredProducts.length > 0 && (
          <div className="text-center py-3">
            <span className="text-muted small">Loading more...</span>
          </div>
        )}
        <div ref={loaderRef} style={{ height: "1px" }} />
      </Container>
    </div>
  );
};

export default Home;
