import React, { useState, useEffect, useRef, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import {
  Container,
  Row,
  Col,
  Form,
  Dropdown,
  Card,
  Placeholder,
  Button
} from "react-bootstrap";
import { FaHeadphones, FaTools } from "react-icons/fa";
import { GiClothes } from "react-icons/gi";
import ProductCard from "../components/ProductCard";
import Banner from '../components/Banner';
import { toast } from "react-toastify";

const SkeletonCard = () => (
  <Card className="p-2 shadow-sm w-100">
    <Placeholder as={Card.Img} animation="wave" style={{ height: '180px' }} />
    <Card.Body>
      <Placeholder animation="wave" xs={8} />
      <Placeholder animation="wave" xs={6} className="mt-2" />
    </Card.Body>
  </Card>
);

const Home = () => {
  const navigate = useNavigate();
  const [allProducts, setAllProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [sortOption, setSortOption] = useState("default");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [categoryLoading, setCategoryLoading] = useState(false);
  const [categoryCache, setCategoryCache] = useState({});
  const loaderRef = useRef(null);
  const firstLoad = useRef(true);
  const topRef = useRef(null);
  const searchTimeout = useRef(null);

  const categories = [
    { name: "Hardware", icon: <FaTools /> },
    { name: "Electronic", icon: <FaHeadphones /> },
    { name: "All", icon: <GiClothes /> },
  ];

  const fetchProducts = useCallback(async (reset = false, newPage = 1) => {
    if (isLoading || (!hasMore && !reset)) return;

    setIsLoading(true);
    const limit = 16;

    try {
      const apiUrl = `https://mj-store.onrender.com/api/v1/product/get/product?page=${newPage}&limit=${limit}`;
      const res = await fetch(apiUrl);
      const data = await res.json();

      if (res.ok && data?.data?.getProduct) {
        const fetchedProducts = data.data.getProduct.map(p => ({ ...p, rating: 4 }));

        if (reset) {
          setAllProducts(fetchedProducts);
          setFilteredProducts(fetchedProducts);
          setHasMore(fetchedProducts.length === limit);
          setPage(2);
        } else {
          setAllProducts((prev) => [...prev, ...fetchedProducts]);
          setFilteredProducts((prev) => [...prev, ...fetchedProducts]);
          setHasMore(fetchedProducts.length === limit);
          setPage(prev => prev + 1);
        }
      } else {
        toast.error("Failed to fetch products.");
        setHasMore(false);
      }
    } catch (error) {
      toast.error("An error occurred while fetching products.");
    } finally {
      setIsLoading(false);
    }
  }, [hasMore, isLoading]);

  const handleSearchChange = (e) => {
    const query = e.target.value.trim();
    setSearchQuery(query);
    clearTimeout(searchTimeout.current);

    searchTimeout.current = setTimeout(() => {
      if (query) {
        const localResults = allProducts.filter((product) =>
          product.name.toLowerCase().includes(query.toLowerCase())
        );

        if (localResults.length > 0) {
          setFilteredProducts(localResults);
        } else {
          searchProductsFromAPI(query);
        }
      } else {
        setFilteredProducts(allProducts);
      }
    }, 500);
  };

  const searchProductsFromAPI = async (query) => {
    try {
      const encodedQuery = encodeURIComponent(query);
      const apiUrl = `https://mj-store.onrender.com/api/v1/product/search?term=${encodedQuery}`;
      const res = await fetch(apiUrl);
      const data = await res.json();

      if (res.ok && data?.data?.getProduct) {
        const searched = data.data.getProduct.map(p => ({ ...p, rating: 4 }));
        setFilteredProducts(searched);
      } else {
        toast.warn("No products found for the given query.");
        setFilteredProducts([]);
      }
    } catch (error) {
      toast.error("Error occurred while searching products.");
    }
  };

  const handleSortChange = (sort) => {
    setSortOption(sort);
    const sortedProducts = [...filteredProducts];

    switch (sort) {
      case "low-to-high":
        sortedProducts.sort((a, b) => a.price - b.price);
        break;
      case "high-to-low":
        sortedProducts.sort((a, b) => b.price - a.price);
        break;
      default:
        break;
    }

    setFilteredProducts(sortedProducts);
  };

  const scrollToTop = () => {
    if (topRef.current) {
      topRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  const handleCategoryClick = async (category) => {
  scrollToTop();
  setSelectedCategory(category);

  if (category === "All") {
    setFilteredProducts(allProducts);
    return;
  }

  const localMatch = allProducts.filter(p =>
    p.category?.toLowerCase() === category.toLowerCase()
  );

  if (localMatch.length > 0) {
    setFilteredProducts(localMatch);
    return;
  }

  if (categoryCache[category]) {
    setFilteredProducts(categoryCache[category]);
    return;
  }

  setCategoryLoading(true);
  console.log(category);
  try {
    const res = await fetch("https://mj-store.onrender.com/api/v1/product/filter", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ category:category }),
    });

    const data = await res.json();
    console.log('category',data);

    if (res.ok && data?.data?.getProduct) {
      const fetched = data.data.map(p => ({ ...p }));
      setFilteredProducts(data.data);
      setCategoryCache((prev) => ({ ...prev, [category]: data.data }));
    } else {
      toast.warn("No products found in this category.");
      setFilteredProducts([]);
    }
  } catch (err) {
    toast.error("Failed to fetch category products.");
  } finally {
    setCategoryLoading(false);
  }
};

  const handleProductClick = (id) => {
    const selectedProduct = allProducts.find((product) => product._id === id);
    if (selectedProduct) {
      navigate("/productDetails", { state: { product: selectedProduct } });
    }
  };

  useEffect(() => {
    if (firstLoad.current) {
      fetchProducts(true);
      firstLoad.current = false;
    }
  }, [fetchProducts]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasMore && !isLoading) {
          fetchProducts(false, page);
        }
      },
      { threshold: 1.0 }
    );

    const currentLoader = loaderRef.current;
    if (currentLoader) observer.observe(currentLoader);

    return () => {
      if (currentLoader) observer.unobserve(currentLoader);
    };
  }, [hasMore, isLoading, fetchProducts, page]);

  return (
    <div className="d-flex flex-column bg-light">
      <div ref={topRef} />

      <Container fluid className="py-3 bg-white shadow-sm sticky-top">
        <Row className="align-items-center">
          <Col xs={12} sm={6}>
            <Form.Control
              type="text"
              placeholder="Search for products..."
              className="rounded-pill"
              value={searchQuery}
              onChange={handleSearchChange}
            />
          </Col>
          <Col xs={12} sm={6} className="d-flex justify-content-sm-end">
            <Dropdown>
              <Dropdown.Toggle variant="outline-dark" id="sort-options">
                Sort
              </Dropdown.Toggle>
              <Dropdown.Menu>
                <Dropdown.Item onClick={() => handleSortChange("default")}>Default</Dropdown.Item>
                <Dropdown.Item onClick={() => handleSortChange("low-to-high")}>Price: Low to High</Dropdown.Item>
                <Dropdown.Item onClick={() => handleSortChange("high-to-low")}>Price: High to Low</Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </Col>
        </Row>
      </Container>

      <Container fluid className="py-3">
        <Row className="justify-content-center">
          {categories.map((category, index) => {
            const isSelected = selectedCategory === category.name;
            return (
              <Col
                key={`${category.name}-${index}`}
                xs={4}
                sm={3}
                className="text-center p-2 category-card"
                onClick={() => handleCategoryClick(category.name)}
              >
                <Card
                  className={`p-3 shadow-sm rounded ${isSelected ? "border border-success bg-light" : ""}`}
                  style={{ cursor: "pointer", transition: "all 0.3s ease" }}
                >
                  <div className={`text-center fs-2 ${isSelected ? "text-success" : "text-dark"}`}>
                    {category.icon}
                  </div>
                  <div className="mt-2 fw-bold">{category.name}</div>
                </Card>
              </Col>
            );
          })}
        </Row>
      </Container>

      <Banner />

      <Container fluid className="mt-4">
        {categoryLoading && (
          <div className="text-center my-4">
            <div className="spinner-border text-success" role="status" />
          </div>
        )}

        <Row className="g-4">
          {filteredProducts.map((product, index) => (
            <Col
              key={`${product._id}-${index}`}
              xs={6}
              sm={4}
              md={3}
              className="d-flex justify-content-center"
              onClick={() => handleProductClick(product._id)}
            >
              <ProductCard product={product} />
            </Col>
          ))}
          {isLoading &&
            [...Array(4)].map((_, i) => (
              <Col key={i} xs={6} sm={4} md={3} className="d-flex justify-content-center">
                <SkeletonCard />
              </Col>
            ))}
        </Row>

        <div ref={loaderRef} style={{ height: "1px" }} />

        <div className="text-center my-4">
          <Button variant="secondary" onClick={scrollToTop}>
            Back to Top
          </Button>
        </div>
      </Container>
    </div>
  );
};

export default Home;
