import React, { useState, useEffect, useCallback } from "react";
import { Container, Row, Col, Form, Button, Spinner, Collapse, Alert } from "react-bootstrap";
import { FaSearch, FaFilter, FaDollarSign, FaSortAmountUp, FaSortAmountDown, FaCheckCircle } from "react-icons/fa";
import { BsFillGridFill } from "react-icons/bs";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import ProductCard from "../components/ProductCard";

const ProductFilterPage = () => {
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [filters, setFilters] = useState({
    name: "",
    category: "",
    brand: "",
    minPrice: "",
    maxPrice: "",
    sortedBy: "price",
    sort: "asc",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [filtersVisible, setFiltersVisible] = useState(true);
  const [showSuccess, setShowSuccess] = useState(false);

  // Debounce timer
  const [debounceTimer, setDebounceTimer] = useState(null);

  const fetchFilteredProducts = async () => {
    setIsLoading(true);
    try {
      const response = await fetch(
        "https://mj-store.onrender.com/api/v1/product/filter",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(filters),
        }
      );

      const data = await response.json();

      if (response.ok && data?.data) {
        setProducts(data.data);
        setShowSuccess(true);
        setTimeout(() => setShowSuccess(false), 3000); // Hide success message after 3 seconds
      } else {
        toast.warn(data.message || "No products found.");
        setProducts([]);
      }
    } catch (error) {
      toast.error("Error fetching products.");
    } finally {
      setIsLoading(false);
      setFiltersVisible(false); // Collapse filters after applying
    }
  };

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters((prev) => ({ ...prev, [name]: value }));

    // Reset debounce timer
    if (debounceTimer) clearTimeout(debounceTimer);

    // Apply filters after delay
    setDebounceTimer(
      setTimeout(() => {
        fetchFilteredProducts();
      }, 500)
    );
  };

  const handleSortChange = (field, order) => {
    setFilters((prev) => ({
      ...prev,
      sortedBy: field,
      sort: order,
    }));
    fetchFilteredProducts();
  };

  const handleProductClick = (product) => {
    navigate(`/productDetails`, { state: { product } });
  };

  return (
    <Container className="my-5">
      <Row>
        <Col className="text-center mb-4">
          <h1 className="fw-bold">
            <FaFilter className="me-2 text-primary" />
            Product Filter Page
          </h1>
        </Col>
      </Row>
      <Row>
        <Col md={12}>
          <Button
            variant="primary"
            className="mb-3"
            onClick={() => setFiltersVisible(!filtersVisible)}
            aria-controls="filter-section"
            aria-expanded={filtersVisible}
          >
            {filtersVisible ? "Hide Filters" : "Show Filters"}
          </Button>
          {showSuccess && (
            <Alert variant="success" className="d-flex align-items-center">
              <FaCheckCircle className="me-2" />
              Filters applied successfully!
            </Alert>
          )}
        </Col>
      </Row>
      <Collapse in={filtersVisible}>
        <Row id="filter-section">
          <Col md={3} className="border-end pe-4">
            <h5 className="fw-bold mb-4">
              <FaSearch className="me-2 text-primary" />
              Filter Options
            </h5>

            <Form.Group className="mb-3">
              <Form.Label>Search by Name</Form.Label>
              <Form.Control
                type="text"
                name="name"
                placeholder="Enter product name..."
                value={filters.name}
                onChange={handleFilterChange}
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Category</Form.Label>
              <Form.Control
                type="text"
                name="category"
                placeholder="Enter category..."
                value={filters.category}
                onChange={handleFilterChange}
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Brand</Form.Label>
              <Form.Control
                type="text"
                name="brand"
                placeholder="Enter brand..."
                value={filters.brand}
                onChange={handleFilterChange}
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Price Range</Form.Label>
              <div className="d-flex gap-2">
                <Form.Control
                  type="number"
                  name="minPrice"
                  placeholder="Min"
                  value={filters.minPrice}
                  onChange={handleFilterChange}
                />
                <Form.Control
                  type="number"
                  name="maxPrice"
                  placeholder="Max"
                  value={filters.maxPrice}
                  onChange={handleFilterChange}
                />
              </div>
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Sort Options</Form.Label>
              <Form.Select
                name="sortedBy"
                value={filters.sortedBy}
                onChange={(e) => handleSortChange(e.target.value, filters.sort)}
              >
                <option value="price">Price</option>
                <option value="name">Name</option>
                <option value="rating">Rating</option>
              </Form.Select>
              <Form.Select
                className="mt-2"
                value={filters.sort}
                onChange={(e) => handleSortChange(filters.sortedBy, e.target.value)}
              >
                <option value="asc">Ascending</option>
                <option value="desc">Descending</option>
              </Form.Select>
            </Form.Group>
          </Col>
        </Row>
      </Collapse>
      <Row>
        <Col md={12} className="mt-4">
          <h5 className="fw-bold mb-4">
            <BsFillGridFill className="me-2 text-primary" />
            Products
          </h5>
          {isLoading ? (
            <Spinner animation="border" variant="primary" />
          ) : products.length > 0 ? (
            <Row className="g-4">
              {products.map((product) => (
                <Col key={product._id} xs={12} sm={6} md={4}>
                  <div
                    onClick={() => handleProductClick(product)}
                    style={{ cursor: "pointer" }}
                  >
                    <ProductCard product={product} />
                  </div>
                </Col>
              ))}
            </Row>
          ) : (
            <p className="text-muted">No products found. Try adjusting your filters.</p>
          )}
        </Col>
      </Row>
    </Container>
  );
};

export default ProductFilterPage;
