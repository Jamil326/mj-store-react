import React, { useState, useEffect } from "react";
import { Container, Row, Col, Form, Button, Pagination } from "react-bootstrap";
import ProductCard from "../components/ProductCard";
import { toast } from "react-toastify";

const ProductPage = () => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("All");
  const [priceRange, setPriceRange] = useState([0, 1000]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const limit = 16; // Products per page

  const categories = ["All", "Electronics", "Hardwares", "Clothes"];
  
  const fetchProducts = async (page = 1) => {
    const baseUrl = `https://mj-store.onrender.com/api/v1/product/get/product?page=${page}&limit=${limit}`;

    try {
      const res = await fetch(baseUrl, {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      });

      const data = await res.json();
      if (!res.ok || !data?.data?.getProduct?.length) {
        throw new Error(data.message || "No products available.");
      }

      setProducts(data.data.getProduct);
      setFilteredProducts(data.data.getProduct);
      setTotalPages(data.data.totalPages || 1); // Update total pages
      toast.success(data.message);
    } catch (error) {
      toast.warn(error.message);
    }
  };

  useEffect(() => {
    fetchProducts(currentPage);
  }, [currentPage]);

  const handleSearch = (e) => {
    const term = e.target.value.toLowerCase();
    setSearchTerm(term);

    const filtered = products.filter((product) =>
      product.name.toLowerCase().includes(term)
    );
    applyFilters(filtered);
  };

  const handleCategoryChange = (e) => {
    const selectedCategory = e.target.value;
    setCategoryFilter(selectedCategory);

    if (selectedCategory === "All") {
      applyFilters(products);
    } else {
      const filtered = products.filter(
        (product) => product.category === selectedCategory
      );
      applyFilters(filtered);
    }
  };

  const handlePriceChange = (e, index) => {
    const newRange = [...priceRange];
    newRange[index] = Number(e.target.value);
    setPriceRange(newRange);

    const filtered = products.filter(
      (product) =>
        product.price >= newRange[0] && product.price <= newRange[1]
    );
    applyFilters(filtered);
  };

  const applyFilters = (filteredList) => {
    const finalFilteredList = filteredList.filter(
      (product) =>
        product.price >= priceRange[0] &&
        product.price <= priceRange[1] &&
        (categoryFilter === "All" || product.category === categoryFilter)
    );

    setFilteredProducts(finalFilteredList);
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  return (
    <Container fluid className="py-4">
      {/* Filters and Search */}
      <Row className="mb-3">
        <Col md={4} className="mb-3">
          <Form.Control
            type="text"
            placeholder="Search by name..."
            value={searchTerm}
            onChange={handleSearch}
          />
        </Col>
        <Col md={3} className="mb-3">
          <Form.Select value={categoryFilter} onChange={handleCategoryChange}>
            {categories.map((category, index) => (
              <option key={index} value={category}>
                {category}
              </option>
            ))}
          </Form.Select>
        </Col>
        <Col md={5} className="d-flex align-items-center">
          <Form.Label className="me-2">Price Range:</Form.Label>
          <Form.Control
            type="number"
            value={priceRange[0]}
            onChange={(e) => handlePriceChange(e, 0)}
            className="me-2"
            style={{ width: "100px" }}
          />
          <span className="me-2">to</span>
          <Form.Control
            type="number"
            value={priceRange[1]}
            onChange={(e) => handlePriceChange(e, 1)}
            style={{ width: "100px" }}
          />
        </Col>
      </Row>

      {/* Products Grid */}
      <Row>
        {filteredProducts.length > 0 ? (
          filteredProducts.map((product, index) => (
            <Col key={index} xs={12} sm={6} md={4} lg={3} className="mb-4">
              <ProductCard product={product} />
            </Col>
          ))
        ) : (
          <Col>
            <h4 className="text-center text-muted">No products found</h4>
          </Col>
        )}
      </Row>

      {/* Pagination */}
      <Row className="justify-content-center mt-4">
        <Pagination>
          {Array.from({ length: totalPages }, (_, index) => (
            <Pagination.Item
              key={index + 1}
              active={index + 1 === currentPage}
              onClick={() => handlePageChange(index + 1)}
            >
              {index + 1}
            </Pagination.Item>
          ))}
        </Pagination>
      </Row>
    </Container>
  );
};

export default ProductPage;
