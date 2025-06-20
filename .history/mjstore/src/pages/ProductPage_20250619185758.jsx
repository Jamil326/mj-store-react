import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Card, Form, Row, Col, Dropdown, Pagination } from "react-bootstrap";

const SearchFilterSort = () => {
  const [search, setSearch] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const [category, setCategory] = useState("");
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [sort, setSort] = useState("");
  const [products, setProducts] = useState([]);
  const [totalPages, setTotalPages] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);
  const navigate = useNavigate();

  // Debounce Effect for Search Input
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedSearch(search);
    }, 500); // Delay API call by 500ms after user stops typing

    return () => {
      clearTimeout(handler); // Clear timeout if input changes before delay
    };
  }, [search]);

  // Fetch Products Function
  const fetchProducts = async () => {
    const queryParams = new URLSearchParams({
      term: debouncedSearch,
      category,
      minPrice,
      maxPrice,
      sort,
      page: currentPage,
      limit: 10,
    }).toString();

    try {
      const response = await fetch(
        `https://mjstore.onrender.com/api/v1/product/search?${queryParams}`,
        {
          method: "GET",
          mode: "cors",
        }
      );

      if (!response.ok) {
        throw new Error("Failed to fetch products");
      }

      if(response
      )

      const data = await response.json();

      setProducts(data.data.products || []);
      setTotalPages(data.data.totalPages || 1);
    } catch (error) {
      console.error("Error fetching products:", error.message);
    }
  };

  // Handle Pagination
  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  // Handle Product Click
  const handleProductClick = (id) => {
    navigate(`/product/${id}`);
  };

  // Fetch products when dependencies change
  useEffect(() => {
    fetchProducts();
  }, [debouncedSearch, category, minPrice, maxPrice, sort, currentPage]);

  return (
    <div className="p-3">
      {/* Search Bar */}
      <Form className="mb-3">
        <Form.Control
          type="text"
          placeholder="Search for products..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="shadow-sm"
        />
      </Form>

      {/* Filters and Sort */}
      <Row className="mb-3">
        <Col>
          <Dropdown onSelect={(value) => setCategory(value)}>
            <Dropdown.Toggle className="w-100 shadow-sm">Category</Dropdown.Toggle>
            <Dropdown.Menu>
              <Dropdown.Item eventKey="Clothing">Clothing</Dropdown.Item>
              <Dropdown.Item eventKey="Electronics">Electronics</Dropdown.Item>
              <Dropdown.Item eventKey="Home">Home</Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </Col>
        <Col>
          <Form.Control
            type="number"
            placeholder="Min Price"
            value={minPrice}
            onChange={(e) => setMinPrice(e.target.value)}
            className="shadow-sm"
          />
        </Col>
        <Col>
          <Form.Control
            type="number"
            placeholder="Max Price"
            value={maxPrice}
            onChange={(e) => setMaxPrice(e.target.value)}
            className="shadow-sm"
          />
        </Col>
        <Col>
          <Dropdown onSelect={(value) => setSort(value)}>
            <Dropdown.Toggle className="w-100 shadow-sm">Sort</Dropdown.Toggle>
            <Dropdown.Menu>
              <Dropdown.Item eventKey="price:asc">Price: Low to High</Dropdown.Item>
              <Dropdown.Item eventKey="price:desc">Price: High to Low</Dropdown.Item>
              <Dropdown.Item eventKey="rating:desc">Rating</Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </Col>
      </Row>

      {/* Product Grid */}
      <Row>
        {products.map((product) => (
          <Col md={4} sm={6} xs={12} key={product.id} className="mb-4">
            <Card
              onClick={() => handleProductClick(product.id)}
              className="shadow-sm h-100 clickable"
            >
              <Card.Img
                variant="top"
                src={product.image || "placeholder.jpg"}
                alt={product.name}
                style={{ height: "200px", objectFit: "cover" }}
              />
              <Card.Body>
                <Card.Title className="text-truncate">{product.name}</Card.Title>
                <Card.Text>₹{product.price}</Card.Text>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>

      {/* Pagination */}
      <Pagination className="justify-content-center mt-3">
        {[...Array(totalPages).keys()].map((num) => (
          <Pagination.Item
            key={num + 1}
            active={num + 1 === currentPage}
            onClick={() => handlePageChange(num + 1)}
          >
            {num + 1}
          </Pagination.Item>
        ))}
      </Pagination>
    </div>
  );
};

export default SearchFilterSort;
