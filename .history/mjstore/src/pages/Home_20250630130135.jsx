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

  const [allProducts, setAllProducts] = useState([]); // Local storage of fetched products
  const [filteredProducts, setFilteredProducts] = useState([]); // Displayed products
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [sortOption, setSortOption] = useState("default");
  const loaderRef = useRef(null);

  const categories = [
    { name: "Hardware", icon: <FaTools /> },
    { name: "Electronic", icon: <FaHeadphones /> },
    { name: "All", icon: <GiClothes /> },
  ];

  const fetchProducts = async (reset = false) => {
    if (!hasMore) return;

    setIsLoading(true);

    try {
      const limit = 16;
      const apiUrl = `https://mj-store.onrender.com/api/v1/product/get/product?page=${page}&limit=${limit}&sort=${sortOption}`;
      const res = await fetch(apiUrl, { method: "GET" });
      const data = await res.json();

      if (res.ok && data?.data?.getProduct) {
        const fetchedProducts = data.data.getProduct;

        if (fetchedProducts.length === 0) {
          setHasMore(false);
        } else {
          setAllProducts((prev) => (reset ? fetchedProducts : [...prev, ...fetchedProducts]));
          setFilteredProducts((prev) =>
            reset ? fetchedProducts : [...prev, ...fetchedProducts]
          );
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
  };

  const searchProductsFromAPI = async (searchQuery) => {
    try {
      const apiUrl = `https://mj-store.onrender.com/api/v1/product/search?${query}`;
      const res = await fetch(apiUrl, { method: "GET" });
      const data = await res.json();

      if (res.ok && data?.data?.getProduct) {
        setFilteredProducts(data.data.getProduct);
      } else {
        toast.error("No products found.");
        setFilteredProducts([]);
      }
    } catch (error) {
      toast.error("Error occurred while searching products.");
    }
  };

  // Filter products dynamically
  useEffect(() => {
    if (searchQuery) {
      const filtered = allProducts.filter((product) =>
        product.name.toLowerCase().includes(searchQuery.toLowerCase())
      );

      if (filtered.length > 0) {
        setFilteredProducts(filtered);
      } else {
        searchProductsFromAPI(searchQuery); // Call API if no local results
      }
    } else {
      setFilteredProducts(allProducts);
    }
  }, [searchQuery, allProducts]);

  useEffect(() => {
    fetchProducts(true); // Fetch products initially or when sort changes
  }, [sortOption]);

  useEffect(() => {
    fetchProducts(); // Fetch products when page changes
  }, [page]);

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
    const selectedProduct = allProducts.find((product) => product._id === id);
    if (selectedProduct) {
      navigate("/productDetails", { state: { product: selectedProduct } });
    }
  };

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleSortChange = (sort) => {
    setSortOption(sort);
    setPage(1);
    setHasMore(true);
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
                <Dropdown.Item onClick={() => handleSortChange("default")}>
                  Default
                </Dropdown.Item>
                <Dropdown.Item onClick={() => handleSortChange("low-to-high")}>
                  Price: Low to High
                </Dropdown.Item>
                <Dropdown.Item onClick={() => handleSortChange("high-to-low")}>
                  Price: High to Low
                </Dropdown.Item>
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
          {filteredProducts.map((product, index) => (
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
