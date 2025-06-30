import React, { useState, useEffect } from "react";
import { Container, Row, Col, Form, Button, Spinner } from "react-bootstrap";
import { FaSearch, FaFilter, FaDollarSign, FaSortAmountUp, FaSortAmountDown } from "react-icons/fa";
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
    sortedBy: "price", // Default sorting field
    sort: "asc", // Default sorting order
  });
  const [isLoading, setIsLoading] = useState(false);

  // Fetch products based on filters
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
      } else {
        toast.warn(data.message || "No products found.");
        setProducts([]);
      }
    } catch (error) {
      toast.error("Error fetching products.");
    } finally {
      setIsLoading(false);
    }
  };

  // Trigger fetch on filters change
  useEffect(() => {
    fetchFilteredProducts();
  }, [filters]);

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters((prev) => ({ ...prev, [name]: value }));
  };

  const handleSortChange = (field, order) => {
    setFilters((prev) => ({
      ...prev,
      sortedBy: field,
      sort: order,
    }));
  };

  const handleProductClick = (product) => {
    const pro = products.find((prod))
    navigate(`/productDetails/${product._id}`, { state: { product } });
  };

  return (
    <Container className="my-5">
      <Row>
        {/* Filters Section */}
        <Col md={3}>
          <h5 className="fw-bold mb-4">
            <FaFilter className="me-2 text-primary" />
            Filter Products
          </h5>

          {/* Name Filter */}
          <Form.Group className="mb-3">
            <Form.Label>
              <FaSearch className="me-2 text-secondary" />
              Search by Name
            </Form.Label>
            <Form.Control
              type="text"
              name="name"
              placeholder="Search products..."
              value={filters.name}
              onChange={handleFilterChange}
            />
          </Form.Group>

          {/* Category Filter */}
          <Form.Group className="mb-3">
            <Form.Label>
              <FaFilter className="me-2 text-secondary" />
              Category
            </Form.Label>
            <Form.Control
              type="text"
              name="category"
              placeholder="Category..."
              value={filters.category}
              onChange={handleFilterChange}
            />
          </Form.Group>

          {/* Brand Filter */}
          <Form.Group className="mb-3">
            <Form.Label>
              <FaFilter className="me-2 text-secondary" />
              Brand
            </Form.Label>
            <Form.Control
              type="text"
              name="brand"
              placeholder="Brand..."
              value={filters.brand}
              onChange={handleFilterChange}
            />
          </Form.Group>

          {/* Price Range */}
          <Form.Group className="mb-3">
            <Form.Label>
              <FaDollarSign className="me-2 text-secondary" />
              Price Range
            </Form.Label>
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

          {/* Sort Options */}
          <Form.Group className="mb-3">
            <Form.Label>
              <FaSortAmountUp className="me-2 text-secondary" />
              Sort By
            </Form.Label>
            <Form.Select
              name="sortedBy"
              value={filters.sortedBy}
              onChange={(e) =>
                handleSortChange(e.target.value, filters.sort)
              }
            >
              <option value="price">Price</option>
              <option value="name">Name</option>
              <option value="rating">Rating</option>
            </Form.Select>
            <Form.Select
              className="mt-2"
              value={filters.sort}
              onChange={(e) =>
                handleSortChange(filters.sortedBy, e.target.value)
              }
            >
              <option value="asc">
                Ascending
              </option>
              <option value="desc">
                Descending
              </option>
            </Form.Select>
          </Form.Group>

          {/* Apply Button */}
          <Button
            variant="primary"
            className="w-100 mt-4"
            onClick={fetchFilteredProducts}
          >
            Apply Filters
          </Button>
        </Col>

        {/* Products Section */}
        <Col md={9}>
          <h5 className="fw-bold mb-4">
            <FaFilter className="me-2 text-primary" />
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
            <p>No products found.</p>
          )}
        </Col>
      </Row>
    </Container>
  );
};

export default ProductFilterPage;
