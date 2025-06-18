import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button, Container, Row, Col } from "react-bootstrap";
import { FaHeadphones, FaTools } from "react-icons/fa";
import { GiClothes } from "react-icons/gi";
import ProductCard from "../components/ProductCard";
import { toast } from "react-toastify";

const Home = () => {
  const navigate = useNavigate();
  const [page, setPage] = useState(1);
  const [products, setProducts] = useState([]);
  const categories = [
    { name: "Hardwares", icon: <FaTools /> },
    { name: "Electronics", icon: <FaHeadphones /> },
    { name: "Clothes", icon: <GiClothes /> },
  ];

  const fetchProducts = async (page) => {
    const limit = 14;
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
      toast.success(data.message);
    } catch (error) {
      toast.warn(error.message);
    }
  };

  useEffect(() => {
    fetchProducts(page);
  }, [page]);

  const handleProductClick = (id) => {
    const selectedProduct = products.find((item) => item._id === id);
    if (selectedProduct) {
      navigate("/productDetails", { state: { product: selectedProduct } });
    }
  };

  return (
    <div className="d-flex flex-column">
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
          {products.length > 0 ? (
            products.map((item, index) => (
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

export default Home;
