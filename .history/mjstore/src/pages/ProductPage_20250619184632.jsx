import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Card, Form, Button, Row, Col, Dropdown } from "react-bootstrap";

const SearchFilterSort = () => {
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState({ category: "", price: "" });
  const [sort, setSort] = useState("");
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();

  // Fetch Products Function
  const fetchProducts = async () => {
    try {
      const response = await fetch(
        "https://mjstore.onrender.com/api/v1/product/search",
        {
          method: "POST",
          mode:''
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            search,
            filter,
            sort,
          }),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to fetch products");
      }

      const data = await response.json();
      setProducts(data.products || []);
    } catch (error) {
      console.error("Error fetching products:", error.message);
    }
  };

  // Handle Search Input Change
  const handleSearchChange = (e) => {
    setSearch(e.target.value);
  };

  // Handle Filter Change
  const handleFilterChange = (key, value) => {
    setFilter((prev) => ({ ...prev, [key]: value }));
  };

  // Handle Sort Change
  const handleSortChange = (value) => {
    setSort(value);
  };

  // Handle Product Click
  const handleProductClick = (id) => {
    navigate(`/product/${id}`);
  };

  // Trigger Fetch on Filter/Sort/Search Update
  useEffect(() => {
    fetchProducts();
  }, [search, filter, sort]);

  return (
    <div className="p-3">
      {/* Search Bar */}
      <Form className="mb-3">
        <Form.Control
          type="text"
          placeholder="Search for products..."
          value={search}
          onChange={handleSearchChange}
          className="shadow-sm"
        />
      </Form>

      {/* Filters and Sort */}
      <Row className="mb-3">
        <Col>
          <Dropdown onSelect={(value) => handleFilterChange("category", value)}>
            <Dropdown.Toggle className="w-100 shadow-sm">
              Category
            </Dropdown.Toggle>
            <Dropdown.Menu>
              <Dropdown.Item eventKey="Clothing">Clothing</Dropdown.Item>
              <Dropdown.Item eventKey="Electronics">Electronics</Dropdown.Item>
              <Dropdown.Item eventKey="Home">Home</Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </Col>
        <Col>
          <Dropdown onSelect={(value) => handleFilterChange("price", value)}>
            <Dropdown.Toggle className="w-100 shadow-sm">Price</Dropdown.Toggle>
            <Dropdown.Menu>
              <Dropdown.Item eventKey="Low to High">Low to High</Dropdown.Item>
              <Dropdown.Item eventKey="High to Low">High to Low</Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </Col>
        <Col>
          <Dropdown onSelect={(value) => handleSortChange(value)}>
            <Dropdown.Toggle className="w-100 shadow-sm">Sort</Dropdown.Toggle>
            <Dropdown.Menu>
              <Dropdown.Item eventKey="Price">Price</Dropdown.Item>
              <Dropdown.Item eventKey="Rating">Rating</Dropdown.Item>
              <Dropdown.Item eventKey="Newest">Newest</Dropdown.Item>
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
    </div>
  );
};

export default SearchFilterSort;
