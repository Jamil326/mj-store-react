import React, { useState, useEffect } from "react";
import { Container, Row, Col, Form, Button, Spinner } from "react-bootstrap";
import ProductCard from "../components/ProductCard";
import { toast } from "react-toastify";

const ProductFilterPage = () => {
  const [products, setProducts] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [filters, setFilters] = useState({
    category: "",
    minPrice: 0,
    maxPrice: 10000,
    rating: 0,
  });
  const [sortOption, setSortOption] = useState("default");
  const [isLoading, setIsLoading] = useState(false);

  // Fetch products dynamically
  const fetchProducts = async () => {
    setIsLoading(true);
    try {
      const queryParams = new URLSearchParams({
        term: searchQuery,
        category: filters.category,
        minPrice: filters.minPrice,
        maxPrice: filters.maxPrice,
        rating: filters.rating,
        sort: sortOption,
      });
      const response = await fetch(
        `https://mj-store.onrender.com/api/v1/product/search?term=${encodeURIComponent()}`
      );
      const data = await response.json();

      if (response.ok && data?.data?.getProduct) {
        setProducts(data.data.getProduct);
      } else {
        toast.warn("No products found.");
        setProducts([]);
      }
    } catch (error) {
      toast.error("Error fetching products.");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, [searchQuery, filters, sortOption]);

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleFilterChange = (e) => {
    setFilters((prevFilters) => ({
      ...prevFilters,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSortChange = (e) => {
    setSortOption(e.target.value);
  };

  return (
    <Container className="my-5">
      <Row>
        <Col md={3}>
          {/* Filters */}
          <h5>Filters</h5>
          <Form.Group>
            <Form.Label>Category</Form.Label>
            <Form.Select
              name="category"
              value={filters.category}
              onChange={handleFilterChange}
            >
              <option value="">All</option>
              <option value="electronics">Electronics</option>
              <option value="fashion">Fashion</option>
              <option value="home">Home Appliances</option>
            </Form.Select>
          </Form.Group>
          <Form.Group className="mt-3">
            <Form.Label>Price Range</Form.Label>
            <div className="d-flex gap-2">
              <Form.Control
                type="number"
                name="minPrice"
                value={filters.minPrice}
                onChange={handleFilterChange}
                placeholder="Min"
              />
              <Form.Control
                type="number"
                name="maxPrice"
                value={filters.maxPrice}
                onChange={handleFilterChange}
                placeholder="Max"
              />
            </div>
          </Form.Group>
          <Form.Group className="mt-3">
            <Form.Label>Rating</Form.Label>
            <Form.Select
              name="rating"
              value={filters.rating}
              onChange={handleFilterChange}
            >
              <option value="0">All Ratings</option>
              <option value="4">4+ Stars</option>
              <option value="3">3+ Stars</option>
              <option value="2">2+ Stars</option>
              <option value="1">1+ Star</option>
            </Form.Select>
          </Form.Group>
        </Col>
        <Col md={9}>
          {/* Search and Sort */}
          <div className="d-flex justify-content-between align-items-center mb-3">
            <Form.Control
              type="text"
              placeholder="Search products..."
              value={searchQuery}
              onChange={handleSearchChange}
              className="w-50"
            />
            <Form.Select
              value={sortOption}
              onChange={handleSortChange}
              className="w-25"
            >
              <option value="default">Sort by Default</option>
              <option value="low-to-high">Price: Low to High</option>
              <option value="high-to-low">Price: High to Low</option>
              <option value="rating">Rating</option>
            </Form.Select>
          </div>

          {/* Products Grid */}
          {isLoading ? (
            <Spinner animation="border" variant="success" />
          ) : (
            <Row className="g-4">
              {products.map((product) => (
                <Col key={product._id} xs={12} sm={6} md={4}>
                  <ProductCard product={product} />
                </Col>
              ))}
            </Row>
          )}
        </Col>
      </Row>
    </Container>
  );
};

export default ProductFilterPage;
