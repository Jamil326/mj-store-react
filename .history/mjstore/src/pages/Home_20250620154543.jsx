import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  Button,
  Container,
  Row,
  Col,
  Form,
  Dropdown,
  Card,
} from "react-bootstrap";
import { FaHeadphones, FaTools } from "react-icons/fa";
import { GiClothes } from "react-icons/gi";
import ProductCard from "../components/ProductCard";
import { toast } from "react-toastify";

const Home = () => {
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

  const fetchProducts = async (page) => {
    const limit = 16;
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
    } catch (error) {
      toast.warn(error.message);
    }
  };

  useEffect(() => {
    fetchProducts(page);
  }, [page]);

  useEffect(() => {
    handleFilter();
  }, [searchTerm, sortOption]);

  const handleFilter = () => {
    let updatedProducts = [...products];

    if (searchTerm) {
      updatedProducts = updatedProducts.filter((product) =>
        product.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if(updatedProducts.length===0){
      const url = 
    }

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
    <div className="d-flex flex-column bg-light">
      {/* Header Section */}
      <Container fluid className="py-3 bg-white shadow-sm sticky-top">
        <Row className="align-items-center">
          <Col xs={12} sm={6} className="mb-2 mb-sm-0">
            <Form.Control
              type="text"
              placeholder="Search for products..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="rounded-pill"
            />
          </Col>
          <Col xs={12} sm={6} className="d-flex justify-content-sm-end">
            <Dropdown>
              <Dropdown.Toggle variant="outline-dark" id="sort-options">
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
      <Container fluid className="py-3">
        <Row className="justify-content-center">
          {categories.map((category, index) => (
            <Col
              key={index}
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
        <Row>
          {filteredProducts.length > 0 ? (
            filteredProducts.map((product) => (
              <Col
                key={product._id}
                xs={6}
                sm={4}
                md={3}
                className="p-2"
                onClick={() => handleProductClick(product._id)}
              >
                <ProductCard product={product} />
              </Col>
            ))
          ) : (
            <Col className="text-center py-5">
              <h5>No products found</h5>
            </Col>
          )}
        </Row>
      </Container>

      {/* Pagination Section */}
      <div className="d-flex justify-content-center align-items-center my-4">
        <Button
          variant="outline-dark"
          onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
          className="me-3 px-4 rounded-pill"
        >
          Previous
        </Button>
        <Button
          variant="success"
          onClick={() => setPage((prev) => prev + 1)}
          className="px-5 rounded-pill"
        >
          Next
        </Button>
      </div>
    </div>
  );
};

export default Home;
