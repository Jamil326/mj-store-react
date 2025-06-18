import { useState, useEffect } from "react";
import { Container, Row, Col, Button, Form } from "react-bootstrap";
import ProductCard from "../components/ProductCard";
import { toast } from "react-toastify";

const ProductPage = () => {
  const [products, setProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filters, setFilters] = useState({
    name: "",
    category: "",
    brand: "",
    minPrice: "",
    maxPrice: "",
    sort: "asc", // 'asc' or 'desc'
    sortedBy: "price", // Attribute to sort by (e.g., "price", "name")
  });
  const [isLoading, setIsLoading] = useState(false);

  const fetchProducts = async () => {
    setIsLoading(true);

    const filterBody = {
      name: filters.name,
      category: filters.category,
      brand: filters.brand,
      minPrice: filters.minPrice,
      maxPrice: filters.maxPrice,
      sort: filters.sort,
      sortedBy: filters.sortedBy,
    };

    try {
      const res = await fetch("https://mj-store.onrender.com/api/v1/product/filter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(filterBody),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || "Failed to fetch products.");
      }

      setProducts(data.data);
      toast.success(data.message);
    } catch (error) {
      toast.error(error.message);
      setProducts([]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSearch = async () => {
    if (!searchTerm) return;

    setIsLoading(true);
    try {
      const res = await fetch(`https://mj-store.onrender.com/api/v1/product/search?term=${searchTerm}`, {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || "Failed to fetch search results.");
      }

      setProducts(data.data.getProduct);
      toast.success(data.message);
    } catch (error) {
      toast.error(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, [filters]);

  return (
    <Container fluid className="py-4">
      {/* Search Section */}
      <Row className="mb-3">
        <Col xs={12} sm={8} md={6}>
          <Form.Control
            type="text"
            placeholder="Search for products..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </Col>
        <Col xs={12} sm={4} md={2} className="mt-2 mt-sm-0">
          <Button onClick={handleSearch} variant="primary" className="w-100">
            Search
          </Button>
        </Col>
      </Row>

      {/* Filter Section */}
      <Row className="mb-4">
        <Col xs={12} md={3}>
          <Form.Control
            type="text"
            placeholder="Filter by category"
            value={filters.category}
            onChange={(e) => setFilters({ ...filters, category: e.target.value })}
          />
        </Col>
        <Col xs={12} md={3} className="mt-2 mt-md-0">
          <Form.Control
            type="text"
            placeholder="Filter by brand"
            value={filters.brand}
            onChange={(e) => setFilters({ ...filters, brand: e.target.value })}
          />
        </Col>
        <Col xs={6} md={2} className="mt-2 mt-md-0">
          <Form.Control
            type="number"
            placeholder="Min Price"
            value={filters.minPrice}
            onChange={(e) => setFilters({ ...filters, minPrice: e.target.value })}
          />
        </Col>
        <Col xs={6} md={2} className="mt-2 mt-md-0">
          <Form.Control
            type="number"
            placeholder="Max Price"
            value={filters.maxPrice}
            onChange={(e) => setFilters({ ...filters, maxPrice: e.target.value })}
          />
        </Col>
        <Col xs={12} md={2} className="mt-2 mt-md-0">
          <Button variant="success" className="w-100" onClick={fetchProducts}>
            Apply Filters
          </Button>
        </Col>
      </Row>

      {/* Sort Section */}
      <Row className="mb-4">
        <Col xs={6} md={4}>
          <Form.Select
            value={filters.sortedBy}
            onChange={(e) => setFilters({ ...filters, sortedBy: e.target.value })}
          >
            <option value="price">Sort by Price</option>
            <option value="name">Sort by Name</option>
          </Form.Select>
        </Col>
        <Col xs={6} md={4}>
          <Form.Select
            value={filters.sort}
            onChange={(e) => setFilters({ ...filters, sort: e.target.value })}
          >
            <option value="asc">Ascending</option>
            <option value="desc">Descending</option>
          </Form.Select>
        </Col>
      </Row>

      {/* Product List Section */}
      <Row>
        {isLoading ? (
          <Col className="text-center">
            <h4>Loading...</h4>
          </Col>
        ) : products.length > 0 ? (
          products.map((product, index) => (
            <Col key={index} xs={12} sm={6} md={4} lg={3} className="mb-4">
              <ProductCard product={product} />
            </Col>
          ))
        ) : (
          <Col className="text-center">
            <h4>No products found</h4>
          </Col>
        )}
      </Row>
    </Container>
  );
};

export default ProductPage;
