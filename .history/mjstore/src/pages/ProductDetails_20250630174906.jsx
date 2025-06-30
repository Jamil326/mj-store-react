import React, { useState, useEffect } from "react";
import { Container, Row, Col, Dropdown, Button, Spinner } from "react-bootstrap";
import { FaFilter, FaDollarSign, FaSortAmountUp, FaSortAmountDown } from "react-icons/fa";
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

  const categories = ["Electronics", "Fashion", "Home Appliances", "Books"];
  const brands = ["Apple", "Samsung", "Nike", "Adidas", "Sony"];

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

  useEffect(() => {
    fetchFilteredProducts();
  }, [filters]);

  const handleFilterChange = (key, value) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
  };

  const handleSortChange = (field, order) => {
    setFilters((prev) => ({
      ...prev,
      sortedBy: field,
      sort: order,
    }));
  };

  const handleProductClick = (product) => {
    navigate("/productDetails", { state: { product } });
  };

  return (
    <Container className="my-5">
      <Row className="mb-4">
        <Col md={3}>
          <Dropdown className="mb-3">
            <Dropdown.Toggle variant="outline-primary" id="category-dropdown">
              {filters.category || "Select Category"}
            </Dropdown.Toggle>
            <Dropdown.Menu>
              {categories.map((cat, idx) => (
                <Dropdown.Item key={idx} onClick={() => handleFilterChange("category", cat)}>
                  {cat}
                </Dropdown.Item>
              ))}
            </Dropdown.Menu>
          </Dropdown>

          <Dropdown className="mb-3">
            <Dropdown.Toggle variant="outline-primary" id="brand-dropdown">
              {filters.brand || "Select Brand"}
            </Dropdown.Toggle>
            <Dropdown.Menu>
              {brands.map((brand, idx) => (
                <Dropdown.Item key={idx} onClick={() => handleFilterChange("brand", brand)}>
                  {brand}
                </Dropdown.Item>
              ))}
            </Dropdown.Menu>
          </Dropdown>

          <div className="mb-3">
            <FaDollarSign className="me-2 text-primary" />
            Price Range:
            <div className="d-flex mt-2">
              <input
                type="number"
                className="form-control me-2"
                placeholder="Min"
                value={filters.minPrice}
                onChange={(e) => handleFilterChange("minPrice", e.target.value)}
              />
              <input
                type="number"
                className="form-control"
                placeholder="Max"
                value={filters.maxPrice}
                onChange={(e) => handleFilterChange("maxPrice", e.target.value)}
              />
            </div>
          </div>

          <div className="mb-3">
            <FaSortAmountUp className="me-2 text-primary" />
            Sort By:
            <div className="d-flex mt-2">
              <Button
                variant={filters.sort === "asc" ? "primary" : "outline-primary"}
                className="me-2"
                onClick={() => handleSortChange(filters.sortedBy, "asc")}
              >
                Ascending
              </Button>
              <Button
                variant={filters.sort === "desc" ? "primary" : "outline-primary"}
                onClick={() => handleSortChange(filters.sortedBy, "desc")}
              >
                Descending
              </Button>
            </div>
          </div>
        </Col>

        <Col md={9}>
          <h5 className="fw-bold mb-4">
            <FaFilter className="me-2 text-primary" />
            Filtered Products
          </h5>
          {isLoading ? (
            <Spinner animation="border" variant="primary" />
          ) : products.length > 0 ? (
            <Row className="g-4">
              {products.map((product) => (
                <Col
                  key={product._id}
                  xs={12}
                  sm={6}
                  md={4}
                  onClick={() => handleProductClick(product)}
                  style={{ cursor: "pointer" }}
                >
                  <ProductCard product={product} />
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
