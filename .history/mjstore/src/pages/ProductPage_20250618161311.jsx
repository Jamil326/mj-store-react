import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button, Container, Row, Col, Form, Dropdown } from "react-bootstrap";
import { FaHeadphones, FaTools } from "react-icons/fa";
import { GiClothes } from "react-icons/gi";
import ProductCard from "../components/ProductCard";
import { toast } from "react-toastify";

const ProductPage = () => {
  const navigate = useNavigate();
  const [page, setPage] = useState(1);
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortOption, setSortOption] = useState("default");
  const categories = [
    { name: "Hardwares", icon: <FaTools /> },
    { name: "Electronics", icon: <FaHeadphones /> },
    { name: "Clothes", icon: <GiClothes /> },
  ];

  // Fetch products from the API with search term
const fetchProducts = async (page, search = "") => {
  const limit = 16;
  const baseUrl = search
    ? `https://mj-store.onrender.com/api/v1/product/search?query=${search}`
    : `https://mj-store.onrender.com/api/v1/product/get/product?page=${page}&limit=${limit}`;

  try {
    const res = await fetch(baseUrl, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    });

    const data = await res.json();

    if (!res.ok || !data?.data?.length) {
      throw new Error(data.message || "No products available.");
    }

    setProducts(data.data);
    setFilteredProducts(data.data);
    toast.success(data.message);
  } catch (error) {
    toast.warn(error.message);
    setProducts([]);
    setFilteredProducts([]);
  }
};


  // Fetch products whenever page or searchTerm changes
  useEffect(() => {
    fetchProducts(page, searchTerm);
  }, [page, searchTerm]);

  // Apply filter and sort on the client-side
  useEffect(() => {
    handleFilter();
  }, [sortOption]);

  const handleFilter = () => {
    let updatedProducts = [...products];

    // Sorting
    if (sortOption === "priceLowToHigh") {
      updatedProducts.sort((a, b) => a.price - b.price);
    } else if (sortOption === "priceHighToLow") {
      updatedProducts.sort((a, b) => b.price - a.price);
    }

    setFilteredProducts(updatedProducts);
  };

  const handleProductClick = (id) => {
    const selectedProduct = filteredProducts.find((item) => item._id === id);
    if (selectedProduct) {
      navigate("/productDetails", { state: { product: selectedProduct } });
    }
  };

  return (
    <div className="d-flex flex-column">
      {/* Search and Sort Section */}
      <Container fluid className="py-3 bg-light shadow-sm">
        <Row className="align-items-center">
          <Col xs={12} md={6} className="mb-2 mb-md-0">
            <Form.Control
              type="text"
              placeholder="Search products..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </Col>
          <Col xs={12} md={6} className="d-flex justify-content-md-end">
            <Dropdown>
              <Dropdown.Toggle variant="success" id="dropdown-sort">
                Sort
              </Dropdown.Toggle>
              <Dropdown.Menu>
                <Dropdown.Item onClick={() => setSortOption("default")}>
                  Default
                </Dropdown.Item>
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
      </Container>

      {/* Categories Section */}
      <Container fluid id="category" className="py-3 bg-light shadow-sm">
        <Row className="overflow-x-scroll flex-nowrap justify-content-start">
          {categories.map((item, index) => (
            <Col
              key={index}
              xs={6}
              sm={4}
              md={3}
              lg={2}
              className="text-center py-2 mx-2 bg-white rounded shadow-sm category-card"
              style={{ cursor: "pointer" }}
            >
              <div className="fs-3 text-success">{item.icon}</div>
              <div className="fw-bold">{item.name}</div>
            </Col>
          ))}
        </Row>
      </Container>

      {/* Products Section */}
      <Container fluid className="mt-3">
        <Row>
          {filteredProducts.length > 0 ? (
            filteredProducts.map((item, index) => (
              <Col
                key={index}
                xs={6}
                md={4}
                lg={3}
                className="p-2"
                onClick={() => handleProductClick(item._id)}
              >
                <ProductCard product={item} />
              </Col>
            ))
          ) : (
            <Col className="text-center">
              <h3>No products available</h3>
            </Col>
          )}
        </Row>
      </Container>

      {/* Pagination */}
      <div className="d-flex justify-content-center align-items-center my-4">
        <Button
          variant="dark"
          onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
          className="me-3 px-4"
        >
          Previous
        </Button>
        <Button
          variant="success"
          onClick={() => setPage((prev) => prev + 1)}
          className="px-5"
        >
          Next
        </Button>
      </div>
    </div>
  );
};

export default ProductPage;
