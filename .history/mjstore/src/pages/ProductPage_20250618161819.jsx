import { useState, useEffect } from "react";
import { Button, Container, Row, Col, Form, Dropdown, Pagination } from "react-bootstrap";
import { toast } from "react-toastify";
import ProductCard from "../components/ProductCard";

const ProductPage = () => {
  const [products, setProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [sortOption, setSortOption] = useState("default");

  // Fetch products from the backend
  const fetchProducts = async (searchTerm, page) => {
    const limit = 10; // Backend limit per page
    const baseUrl = `https://mj-store.onrender.com/api/v1/product/search?term=${searchTerm}&page=${page}&limit=${limit}`;

    try {
      const res = await fetch(baseUrl, {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      });

      const data = await res.json();

      if (!res.ok || !data?.data?.products?.length) {
        throw new Error(data.message || "No products found.");
      }

      setProducts(data.data.products);
      setTotalPages(data.data.totalPages || 1);
      toast.success(data.message);
    } catch (error) {
      toast.warn(error.message);
      setProducts([]);
    }
  };

  // Debounce input to delay API calls
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      fetchProducts(searchTerm, 1);
    }, 500); // Delay of 500ms
    return () => clearTimeout(timeoutId);
  }, [searchTerm]);

  // Fetch products when the page changes
  useEffect(() => {
    if (searchTerm) {
      fetchProducts(searchTerm, page);
    }
  }, [page]);

  return (
    <Container fluid className="py-3">
      {/* Search and Sort Section */}
      <Row className="align-items-center mb-4">
        <Col xs={12} md={8}>
          <Form.Control
            type="text"
            placeholder="Search for products..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </Col>
        <Col xs={12} md={4} className="d-flex justify-content-md-end mt-2 mt-md-0">
          <Dropdown>
            <Dropdown.Toggle variant="success" id="dropdown-sort">
              Sort
            </Dropdown.Toggle>
            <Dropdown.Menu>
              <Dropdown.Item onClick={() => setSortOption("default")}>Default</Dropdown.Item>
              <Dropdown.Item onClick={() => setSortOption("priceLowToHigh")}>
                Price: Low to High
              </Dropdown.Item>
              <Dropdown.Item onClick={() => setSortOption("priceHighToLow")}>
                Price: High to Low
              </Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </Col>
      </Row>

      {/* Products Section */}
      <Row>
        {products.length > 0 ? (
          products.map((product) => (
            <Col key={product._id} xs={12} sm={6} md={4} lg={3} className="mb-4">
              <ProductCard product={product} />
            </Col>
          ))
        ) : (
          <Col className="text-center">
            <h5>No products found. Try another search.</h5>
          </Col>
        )}
      </Row>

      {/* Pagination */}
      <div className="d-flex justify-content-center mt-4">
        <Pagination>
          <Pagination.Prev
            onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
            disabled={page === 1}
          />
          {Array.from({ length: totalPages }).map((_, index) => (
            <Pagination.Item
              key={index}
              active={page === index + 1}
              onClick={() => setPage(index + 1)}
            >
              {index + 1}
            </Pagination.Item>
          ))}
          <Pagination.Next
            onClick={() => setPage((prev) => Math.min(prev + 1, totalPages))}
            disabled={page === totalPages}
          />
        </Pagination>
      </div>
    </Container>
  );
};

export default ProductPage;
